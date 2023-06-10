import { useCallback, useEffect } from 'react';
import isInputElement from "../../utilities/domUtils";
import { IconLeft, IconRight } from '../ui/Icons';
import SecondaryButton from './../ui/buttons/Secondary';
import './Pagination.scss';

const Pagination = ({ page, total, handleNext, handlePrev }) => {
    const previousEnabled = page + 1 > 1;
    const nextEnabled = page + 1 < total;

    const onKeyDownListener = useCallback((ev) => {
        if (isInputElement(document.activeElement)) {
            return;
        }

        if (previousEnabled && ev.key === 'p') {
            ev.preventDefault();
            handlePrev();
        } else if (nextEnabled && ev.key === 'n') {
            ev.preventDefault();
            handleNext();
        }
    }, [previousEnabled, nextEnabled, handlePrev, handleNext]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    return <div className='pagination'>
        <SecondaryButton tooltip='Previous [P]' disabled={!previousEnabled} onClick={handlePrev}><IconLeft styling={{ width: 24 }} /></SecondaryButton>
        <label>{page + 1} <span className='opacity-25'>|</span> {total} </label>
        <SecondaryButton tooltip='Next [N]' disabled={!nextEnabled} onClick={handleNext}><IconRight styling={{ width: 24 }} /></SecondaryButton>
    </div>
}

export default Pagination
