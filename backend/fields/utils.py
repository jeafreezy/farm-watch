def file_validator(file):

    # check format and size
    file_format = file.filename.split(".")[1]
    acceptable_formats = {"gpkg", "kml", "kmz", "geojson"}
    if file_format.lower() not in acceptable_formats:
        return None, 422, "file is not supported"
    return file, 200, "file is valid"


def get_centroid(file):
    return file


def get_bbox(file):
    return file


def get_area(file):
    return file


def convert_to_geojson(file):
    return file


def file_transformer(file):
    centroid = get_centroid(file)
    area = get_area(file)
    bbox = get_bbox(file)
    geom = convert_to_geojson(file)
    name = file.filename.split(".")[0]
    size = 1
    return centroid, area, bbox, size, name, geom
