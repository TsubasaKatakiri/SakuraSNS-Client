import React from 'react';
import AlbumThumbnail from '../AlbumThumbnail/AlbumThumbnail';

const AlbumShellContent = ({albums}) => {
    const albumsList = albums.length > 2 ? albums.slice(0, 2) : albums;
    
    return (
        <>
            {albumsList.map(album => {
                return <AlbumThumbnail key={album._id} albumData={album}/>
            })}
        </>
    );
};

export default AlbumShellContent;