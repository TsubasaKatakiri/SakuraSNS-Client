import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducer from './Auth/AuthReducer';
import ChatReducer from './Chat/ChatReducer';
import ProfileReducer from './Profile/ProfileReducer';
import PostReducer from './Post/PostReducer';
import FeedReducer from './Feed/FeedReducer';
import AudioReducer from './Audio/AudioReducer';
import VideoReducer from './Video/VideoReducer';
import CurrentVideoReducer from './CurrentVideo/CurrentVideoReducer';
import VideoSearchReducer from './VideoSearch/VideoSearchReducer';
import GalleryAudioReducer from './AudioGallery/AudioGalleryReducer';
import GalleryVideoReducer from './VideoGallery/VideoGalleryReducer';
import UserAlbumsReducer from './AlbumsGallery/AlbumsGalleryReducer';
import UserAlbumReducer from './AlbumGallery/AlbumGalleryReducer';
import PeopleReducer from './People/PeopleReducer';
import GroupSearchReducer from './GroupSearch/GroupSearchReducer';
import GroupReducer from './Group/GroupReducer';
import GroupMembersReducer from './GroupMembers/GroupMembersReducer';
import CurrentDiscussionReducer from './GroupCurrentDiscussion/GroupCurrentDiscussionReducer';
import DiscussionPostReducer from './GroupDiscussionPost/GroupDiscussionPostReducer';
import DiscussionListReducer from './GroupDiscussionsList/GroupDiscussionListReducer';
import GroupEventsReducer from './GroupEvents/GroupEventsReducer';
import EventReducer from './GroupEvent/GroupEventReducer';
import GroupInfoReducer from './GroupInfo/GroupInfoReducer';
import GroupInfoListReducer from './GroupInfoList/GroupInfoListReducer';
import GroupAlbumsReducer from './GroupAlbums/GroupAlbumsReducer';
import GroupAlbumReducer from './GroupAlbum/GroupAlbumReducer';
import GroupImageReducer from './GroupImage/GroupImageReducer';
import GroupMediaReducer from './GroupMedia/GroupMediaReducer';
import GroupContentReducer from './GroupContent/GroupContentReducer';
import GroupVideoReducer from './GroupVideo/GroupVideoReducer';
import GroupMusicReducer from './GroupMusic/GroupMusicReducer';
import GroupFeedReducer from './GroupFeed/GroupFeedReducer';
import CurrentFeedPostReducer from './CurrentFeedPost/CurrentFeedPostReducer';
import BlacklistReducer from './Blacklist/BlacklistReducer';
import UserMediaReducer from './UserMedia/UserMediaReducer';

let reducers = combineReducers({
    auth: AuthReducer,
    chat: ChatReducer,
    profile: ProfileReducer,
    posts: PostReducer,
    feed: FeedReducer,
    audio: AudioReducer,
    video: VideoReducer,
    currentVideo: CurrentVideoReducer,
    videoSearch: VideoSearchReducer,
    galleryAudio: GalleryAudioReducer,
    galleryVideo: GalleryVideoReducer,
    galleryAlbums: UserAlbumsReducer,
    galleryAlbum: UserAlbumReducer,
    people: PeopleReducer,
    groupSearch: GroupSearchReducer,
    group: GroupReducer,
    groupMembers: GroupMembersReducer,
    discussion: CurrentDiscussionReducer,
    discussionPost: DiscussionPostReducer,
    discussionList: DiscussionListReducer,
    groupEvents: GroupEventsReducer,
    groupEvent: EventReducer,
    groupInfo: GroupInfoReducer,
    infoList: GroupInfoListReducer,
    groupAlbums: GroupAlbumsReducer,
    groupAlbum: GroupAlbumReducer,
    groupImage: GroupImageReducer,
    groupMedia: GroupMediaReducer,
    groupContent: GroupContentReducer,
    groupVideo: GroupVideoReducer,
    groupMusic: GroupMusicReducer,
    groupFeed: GroupFeedReducer,
    post: CurrentFeedPostReducer,
    blacklist: BlacklistReducer,
    userMedia: UserMediaReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

window.__store__=store;

export default store;