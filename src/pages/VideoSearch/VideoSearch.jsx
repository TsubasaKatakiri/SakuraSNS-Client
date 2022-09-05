import React, { useEffect } from 'react';
import { getSearchResults, getTagResults, resetSearchVideos } from '../../redux/VideoSearch/VideoSearchActions';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VideoSearchContent from '../../components/VideoSearchComponents/VideoSearchContent/VideoSearchContent';

const VideoSearch = ({currentUser, token, query, videos, page, totalPages, more, isFetching, error, getVideos, getTagVideos, resetVideos, ...props}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('term');
    const tagQuery = searchParams.get('tag');

    const getResults = (pageNumber) => {
        if(tagQuery){
            if(pageNumber) getTagVideos(tagQuery ? tagQuery : '', currentUser._id, token, pageNumber);
            else getTagVideos(tagQuery ? tagQuery : '', currentUser._id, token);
        }else{
            if(pageNumber) getVideos(searchQuery ? searchQuery : '', currentUser._id, token, pageNumber);
            else getVideos(searchQuery ? searchQuery : '', currentUser._id, token);
        }
    }

    useEffect(() => {
        getResults();
        return () => resetVideos();
    }, [searchQuery, tagQuery]);

    const setQueryMethod = (query) => {
        navigate(query ? `/video/search?term=${query}` : `/video/search`);
    }

    return <VideoSearchContent query={searchQuery} getResults={getResults} setQueryMethod={setQueryMethod} videos={videos} isFetching={isFetching} error={error} page={page} more={more}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        videos: state.videoSearch.videos,
        page: state.videoSearch.page,
        totalPages: state.videoSearch.totalPages,
        more: state.videoSearch.more,
        isFetching: state.videoSearch.isFetching,
        error: state.videoSearch.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (search, userId, token, page) => {dispatch(getSearchResults(search, userId, token, page))},
        getTagVideos: (tag, token, page) => {dispatch(getTagResults(tag, token, page))},
        resetVideos: () => {dispatch(resetSearchVideos())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearch);