import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateGroup from '../../components/GroupsComponents/CreateGroup/CreateGroup';
import GroupPage from '../../components/GroupsComponents/GroupPage/GroupPage';
import GroupSettings from '../../components/GroupsComponents/GroupSettingsPage/GroupSettings';
import GroupMembersPage from '../../components/GroupsComponents/GroupMembersComponents/GroupMembersPage';
import GroupsMain from '../../components/GroupsComponents/GroupsPage/GroupsMain';
import MusicGallery from '../../components/GroupsComponents/GroupMusicComponents/MusicGallery/MusicGallery';
import EventsListPage from '../../components/GroupsComponents/GroupEventsComponents/EventsListPage/EventsListPage';
import EventPage from '../../components/GroupsComponents/GroupEventsComponents/EventPage/EventPage';
import EventCreationPage from '../../components/GroupsComponents/GroupEventsComponents/EventCreationPage/EventCreationPage';
import EventEditPage from '../../components/GroupsComponents/GroupEventsComponents/EventEditPage/EventEditPage';
import InfoListPage from './../../components/GroupsComponents/GroupInfoComponents/InfoListPage/InfoListPage';
import InfoPage from '../../components/GroupsComponents/GroupInfoComponents/InfoPage/InfoPage';
import DiscussionListPage from './../../components/GroupsComponents/GroupDiscussionComponents/DiscussionListPage/DiscussionListPage';
import DiscussionPage from '../../components/GroupsComponents/GroupDiscussionComponents/DiscussionPage/DiscussionPage';
import GroupUsersSettings from '../../components/GroupsComponents/GroupUsersSettings/GroupUsersSettings';
import VideoPages from '../../components/GroupsComponents/GroupVideoComponents/VideoPages/VideoPages';
import AlbumsPage from '../../components/GroupsComponents/GroupAlbumsComponents/AlbumsPage/AlbumsPage';

const GroupsPage = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<GroupsMain/>}/>
                <Route path='/create' element={<CreateGroup/>}/>
                <Route path='/:groupId' element={<GroupPage/>}/>
                <Route path='/:groupId/post' element={<GroupPage/>}/>
                <Route path='/:groupId/people' element={<GroupMembersPage/>}/>
                <Route path='/:groupId/post/:postId' element={<GroupPage/>}/>
                <Route path='/:groupId/albums/*' element={<AlbumsPage/>}/>
                <Route path='/:groupId/music' element={<MusicGallery/>}/>
                <Route path='/:groupId/videos/*' element={<VideoPages/>}/>
                <Route path='/:groupId/event/addEvent' element={<EventCreationPage/>}/>
                <Route path='/:groupId/event/' element={<EventsListPage/>}/>
                <Route path='/:groupId/event/:eventId' element={<EventPage/>}/>
                <Route path='/:groupId/event/:eventId/edit' element={<EventEditPage/>}/>
                <Route path='/:groupId/info' element={<InfoListPage/>}/>
                <Route path='/:groupId/info/:infoId' element={<InfoPage/>}/>
                <Route path='/:groupId/discussions' element={<DiscussionListPage/>}/>
                <Route path='/:groupId/discussions/:discussionId' element={<DiscussionPage/>}/>
                <Route path='/:groupId/settings' element={<GroupSettings/>}/>
                <Route path='/:groupId/settings/manageUsers/*' element={<GroupUsersSettings/>}/>
            </Routes>
        </div>
    );
};

export default GroupsPage;