
from copy import copy
from typing import List
from fastapi import UploadFile
import fiona 

SUPPORTED_FORMATS = "GPKG, GeoJSON, WKT, TopoJSON"
SUPPORTED_GEOMETRY_TYPE = {"Polygon","MultiPolygon"}

GEOJSON_SCHEMA = {
    "type":"FeatureCollection",
    "features":[
    ]
}



def validate_files(files: List[UploadFile]):

    supported_formats = {"gpkg","geojson","topojson","wkt"}
    validated_files = []
    # check formats
    for file in files:
        file_format = file.filename.split(".")[1]
        if file_format.lower() not in supported_formats:
            return (
                None,
                422,
                f"One or more file of type .{file_format} is not supported. Supported formats are:({SUPPORTED_FORMATS})",
            )
        validated_files.append(file)
    return validated_files, 200, "Files are supported"

def check_coordinates(coordinates):

     #check if the feature has at least four array of coordinates
    coordinates_length = len(coordinates)
    is_valid = coordinates_length  >=4
    
    if not is_valid:
        return None, 400, f"Invalid GeoJSON feature. Feature must be a valid Polygon/MultiPolygon"

    #check if the individual array has only two coordinate pair and the values are float data type at least
    for coordinate in coordinates:
        valid_length_and_values = len(coordinate) == 2 and isinstance(coordinate[0],float) and isinstance(coordinate[1],float)
        if not valid_length_and_values:
            return None, 400, f"Invalid GeoJSON feature. Feature must be a valid Polygon/MultiPolygon"
    #check if the first coordinate pair is the same with the last one
    closed_ring = coordinates[0] == coordinates[-1]

    if not closed_ring:
        return None, 400, f"Invalid GeoJSON feature. Feature must be a valid Polygon/MultiPolygon"
    return

def validate_feature(feature):

    #firstly check if it's a supported geometry type

    feature_object = feature["geometry"]
    geometry_type = feature_object["type"]

    supported_geometry =  geometry_type in SUPPORTED_GEOMETRY_TYPE


    if not supported_geometry:
        return None, 400, f"Invalid geometry type: {geometry_type}. Allowed geometries are {SUPPORTED_GEOMETRY_TYPE}"
    
    #validate supported geometry -> Insights from GeoJSON spec https://www.rfc-editor.org/rfc/rfc7946

    #check if coordinates is an array
    is_array = isinstance(feature_object["coordinates"],list)

    if not is_array:
        return None, 400, f"Invalid GeoJSON Feature. Feature must be a valid Polygon/MultiPolygon"
    
    #array must not be empty i.e contain at least a closed linear ring

    has_values = len(feature_object["coordinates"]) > 0
    
    if not has_values:
        return None, 400, f"Invalid GeoJSON feature. Feature must be a valid Polygon/MultiPolygon"

    #Polygons can have holes but but I only need the exterior ring for the farm boundary/fields
    
    validated_feature = []

    if geometry_type == "Polygon":
        prioritized_polygon = feature_object["coordinates"][0]
        check_coordinates(prioritized_polygon)
        validated_feature.append(prioritized_polygon)

    else: #MultiPolygon

        multipolygon = feature_object["coordinates"]
        for polygon in multipolygon:
            check_coordinates(polygon)
        validated_feature.append(multipolygon)

    return validated_feature , 200, "Feature is valid"

def modify_feature(validated_feature,feature,original_datasource):

    
    #update current feature coordinates with validated feature
    #just incase it's a hole and only the external external ring is used
    
    #copy to preserve other info e.g properties

    modified_feature = copy(feature)

    modified_feature.update({
        "bbox":original_datasource.bounds
    })
    modified_feature["properties"].update({
        "crs":original_datasource.crs
    })

    modified_feature["geometry"].update({
        
        "coordinates":validated_feature
    })
    return modified_feature

def file_transformer(valid_files: List[UploadFile]):

    for file in valid_files:
        with fiona.open(file.file) as datasource:
            
            feature_count = len(datasource)

            if feature_count == 0:
                return None, 400, f"Invalid Feature. File must contain a valid Feature"

            if feature_count == 1:
                
                #validate feature

                validated_feature, status_code, message = validate_feature(datasource[0])
                
                if not status_code == 200:
                    return None, status_code,message

                modified_feature = modify_feature(validated_feature=validated_feature,feature=datasource[0],original_datasource=datasource)

                GEOJSON_SCHEMA["features"].append(modified_feature)

            if feature_count > 1:
                
                for feature in datasource:
                   
                    #validate feature
                    validated_feature, status_code, message = validate_feature(feature)
                    
                    if not status_code == 200:
                        return None, status_code,message

                    modified_feature = modify_feature(validated_feature=validated_feature,feature=feature,original_datasource=datasource)

                    GEOJSON_SCHEMA["features"].append(modified_feature)
    return GEOJSON_SCHEMA, 200, f"Feature transformed successfully"

