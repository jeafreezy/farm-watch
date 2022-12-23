import React, {
    ReactElement,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useMapContext } from '../../context/MapContext';
import GeocodeService from '../../services/GeocodeService';
import maplibregl, { Marker } from 'maplibre-gl';
type TSearchResult = {
    boundingbox?: [string, string, string, string];
    class?: string;
    display_name: string;
    icon?: string;
    importance?: number;
    lat: string;
    lon: string;
    osm_id: number;
    place_id: number;
    type?: string;
    licence: string;
};
const Geocoder = (): ReactElement => {
    const [searchResult, setSearchResult] = useState([]);
    const [value, setValue] = useState('');
    const [selectedSearchResult, setSelectedSearchResult] =
        useState<TSearchResult | null>(null);
    const { mapInstance } = useMapContext();
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const resultItem = useRef<HTMLLIElement>(null);
    const [showResult, setShowResult] = useState(false);
    const [triggerSearch, setTriggerSearch] = useState(true);
    const [marker, setMarker] = useState<Marker | null>(null);
    const resetSearchState = useCallback(() => {
        setSearchResult([]);
        setFocusedIndex(-1);
        setShowResult(false);
    }, []);

    const handleBlurEvent = () => {
        resetSearchState();
    };
    //https://maplibre.org/maplibre-gl-js-docs/example/flyto-options/
    useEffect(() => {
        if (!selectedSearchResult) return;
        const { lon, lat } = selectedSearchResult;
        //marker todo: customize marker
        var marker = new maplibregl.Marker()
            .setLngLat([Number(lon), Number(lat)])
            .addTo(mapInstance);
        setMarker(marker);
        mapInstance.flyTo({
            center: [lon, lat],
            zoom: 9,
            speed: 0.5,
            curve: 1,
            essential: true,
        });

        return function cleanUp() {
            marker.remove();
        };
    }, [selectedSearchResult]);

    const handleAddressSearch = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        if (inputValue.length > 2 && triggerSearch) {
            const data = await GeocodeService(inputValue);
            setSearchResult(data);
            setShowResult(true);
        } else {
            resetSearchState();
        }
    };

    //to remove any markers on the map when the search bar is empty
    useEffect(() => {
        if (!marker) return;
        if (value.length === 0) {
            marker.remove();
            setMarker(null);
        }
    }, [value]);

    const handleSearchResultClick = (item: TSearchResult) => {
        setValue(item?.display_name);
        setSelectedSearchResult(item);
        resetSearchState();
    };

    //keyboard events
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const { key } = e;
        let nextIndex = 0;

        //this is to prevent the geocoding service from making an API call when a user is clearing the search box
        if (key === 'Backspace') {
            setTriggerSearch(false);
        } else {
            setTriggerSearch(true);
        }
        //move down
        if (key === 'ArrowDown') {
            nextIndex = (focusedIndex + 1) % searchResult.length;
        }
        //move up
        if (key === 'ArrowUp') {
            nextIndex =
                (focusedIndex + searchResult.length - 1) % searchResult.length;
        }
        //hide search results
        if (key === 'Escape') {
            resetSearchState();
        }

        //select the current item
        if (key === 'Enter') {
            e.preventDefault();
            handleSelection(focusedIndex);
        }
        setFocusedIndex(nextIndex);
    };

    const handleSelection = (index: number) => {
        const selectedItem: TSearchResult = searchResult[index];

        if (!selectedItem) return;
        setValue(selectedItem.display_name);
        setSelectedSearchResult(selectedItem);
        resetSearchState();
    };

    const searchResultLenght = searchResult.length;
    return (
        <div className="absolute top-4 left-4 flex max-w-[300px] cursor-pointer flex-col justify-between gap-1 font-semibold text-brand-white">
            <div
                className="flex  items-center rounded-lg border-none bg-brand-black p-2   "
                onKeyDown={handleKeyDown}
                tabIndex={1}
                onBlur={handleBlurEvent}
            >
                <input
                    placeholder="Search location"
                    className=" w-[250px] bg-brand-black p-2 outline-none"
                    type="text"
                    value={value}
                    onChange={handleAddressSearch}
                ></input>
                <span className="cursor-pointer">
                    <AiOutlineSearch size={20} />
                </span>
            </div>
            {showResult && searchResultLenght > 1 ? (
                <div className=" rounded-lg bg-brand-black p-2  shadow-lg ">
                    <ul>
                        {searchResult.map((item: any, index) => {
                            return (
                                <li
                                    key={index}
                                    className="  p-1 text-sm font-normal hover:bg-gray-800"
                                    onClick={() =>
                                        handleSearchResultClick(item)
                                    }
                                    onMouseDown={() => handleSelection(index)}
                                    ref={
                                        index === focusedIndex
                                            ? resultItem
                                            : null
                                    }
                                    style={{
                                        backgroundColor:
                                            index === focusedIndex
                                                ? 'rgb(31,41 ,55)' //same as bg-gray-800
                                                : '',
                                    }}
                                >
                                    {item?.display_name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : showResult && searchResultLenght === 0 ? (
                <p className="rounded-lg bg-brand-black p-2 text-sm font-normal italic">
                    No result found
                </p>
            ) : null}
        </div>
    );
};

export default Geocoder;
