import React, { useEffect } from 'react';
import LoaderShell from '../../../MinorComponents/LoaderShell/LoaderShell';
import AudioListContent from '../AudioListContent/AudioListContent';

const AudioList = ({music, page, more, resetResults, getResults, isFetching, error, setFavoriteAudio, unsetFavoriteAudio, currentUser, token, deleteAudio}) => {
    useEffect(() => {
        getResults();
        return () => resetResults();
    }, []);

    return (
        <LoaderShell getResults={getResults} isFetching={isFetching} page={page} more={more} elementId={'audiolist'}>
            <AudioListContent currentUser={currentUser} token={token} music={music} isFetching={isFetching} error={error} setFavorite={setFavoriteAudio} unsetFavorite={unsetFavoriteAudio} deleteAudio={deleteAudio}/>
        </LoaderShell>
    )
};

export default AudioList;