import { Input } from "@chakra-ui/react";
import { createRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isInputElement from "../../utilities/domUtils";

const SearchBox = () => {
    const navigate = useNavigate();
    const inputRef = createRef();

    const onKeyDownListener = useCallback((ev) => {
        if (!isInputElement(document.activeElement) && ev.key === '/') {
            ev.preventDefault();

            inputRef.current.select();
            inputRef.current.focus();
        }
    }, [inputRef]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    const handleSearchKeyDown = ev => {
        const inputField = ev.target;
        const trimmedValue = inputField.value.trim();
        if (ev.key === 'Enter' && trimmedValue.length > 0) {
            navigate('/search/' + encodeURIComponent(trimmedValue));
        }
    }

    return <Input w={200} ref={inputRef} type="search" placeholder="Search..." onKeyDown={handleSearchKeyDown} />
}

export default SearchBox;
