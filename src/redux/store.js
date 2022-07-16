import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import UserAlbumReducer from "./AlbumGalleryReducer";
// import UserAlbumsReducer from "./AlbumsGalleryReducer";
// import GalleryAudioReducer from "./AudioGalleryReducer";
// import AudioReducer from "./AudioReducer";
// import AuthReducer from "./AuthReducer";
// import BlacklistReducer from "./BlacklistReducer";
// import ChatReducer from "./ChatReducer";
// import CurrentFeedPostReducer from "./CurrentFeedPostReducer";
// import CurrentVideoReducer from "./CurrentVideoReducer";
// import FeedReducer from "./FeedReducer";
// import GalleryReducer from "./GalleryReducer";
// import GroupAlbumReducer from "./GroupAlbumReducer";
// import GroupAlbumsReducer from "./GroupAlbumsReducer";
// import DiscussionReducer from "./GroupDiscussionReducer";
// import EventReducer from "./GroupEventReducer";
// import GroupFeedReducer from "./GroupFeedReducer";
// import GroupImageReducer from "./GroupImageReducer";
// import GroupInfoReducer from "./GroupInfoReducer";
// import GroupMediaReducer from "./GroupMediaReducer";
// import GroupContentReducer from "./GroupContentReducer";
// import GroupMembersReducer from "./GroupMembersReducer";
// import GroupMusicReducer from "./GroupMusicReducer";
// import GroupReducer from "./GroupReducer";
// import GroupSearchReducer from "./GroupSearchReducer";
// import GroupVideoReducer from "./GroupVideoReducer";
// import ImageGalleryReducer from "./ImageGalleryReducer";
// import PeopleReducer from "./PeopleReducer";
// import PostReducer from "./PostReducer";
// import ProfileReducer from "./ProfileReducer";
// import UserMediaReducer from "./UserMediaReducer";
// import GalleryVideoReducer from "./VideoGalleryReducer";
// import VideoReducer from "./VideoReducer";
// import VideoSearchReducer from "./VideoSearchReducer";
// import GroupEventsReducer from "./GroupEventsReducer";
// import GroupInfoListReducer from "./GroupInfoListReducer";
// import DiscussionListReducer from "./GroupDiscussionsListReducer";
// import CurrentDiscussionReducer from "./GroupCurrentDiscussionReducer";
// import DiscussionPostReducer from "./GroupDiscussionPostReducer";
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
    // gallery: GalleryReducer,
    // imageGallery: ImageGalleryReducer,
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