import React, { useState } from 'react';
import classes from './PoliciesSettings.module.scss';
import {Formik, Form} from 'formik';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';
import { checkPolicy, getAllowedRoles } from '../../../../util/CheckPolicy';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';

const PoliciesSettings = ({currentUser, token, group, updateGroupPolicies}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canEditGroupPolicies);
    const allowedRoles = getAllowedRoles(group.policies.canEditGroupPolicies);

    const [isPrivate, setIsPrivate] = useState(group.policies.isPrivate);
    const isPrivateValues = [{value: false, caption: 'Content is visible for everyone'}, {value: true, caption: 'Content is visible only to members'}];
    const [isFreeJoin, setIsFreeJoin] = useState(group.policies.isFreeJoin);
    const isFreeJoinValues = [{value: true, caption: 'Everyone can freely join the group'}, {value: false, caption: 'Group joining is controlled'}];
    const [canEditGroupInfo, setCanEditGroupInfo] = useState(group.policies.canEditGroupInfo);
    const canEditGroupInfoValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}];
    const [canEditGroupPolicies, setCanEditGroupPolicies] = useState(group.policies.canEditGroupPolicies);
    const canEditGroupPoliciesValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}];
    const [canDeleteGroup, setCanDeleteGroup] = useState(group.policies.canDeleteGroup);
    const canDeleteGroupValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}];
    const [canUpdateUserLevels, setCanUpdateUserLevels] = useState(group.policies.canUpdateUserLevels);
    const canUpdateUserLevelsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}];
    const [canDeleteDiscussions, setCanDeleteDiscussions] = useState(group.policies.canDeleteDiscussions);
    const canDeleteDiscussionsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}];
    const [canBanUsers, setCanBanUsers] = useState(group.policies.canBanUsers);
    const canBanUsersValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}];
    const [canAcceptJoinRequests, setCanAcceptJoinRequests] = useState(group.policies.canAcceptJoinRequests);
    const canAcceptJoinRequestsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}];
    const [canDeletePosts, setCanDeletePosts] = useState(group.policies.canDeletePosts);
    const canDeletePostsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}];
    const [canSetEvents, setCanSetEvents] = useState(group.policies.canSetEvents);
    const canSetEventsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}, {value: 'all', caption: 'All group members'}];
    const [canCreatePosts, setCanCreatePosts] = useState(group.policies.canCreatePosts);
    const canCreatePostsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}, {value: 'all', caption: 'All group members'}];
    const [canCreateDiscussions, setCanCreateDiscussions] = useState(group.policies.canCreateDiscussions);
    const canCreateDiscussionsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}, {value: 'all', caption: 'All group members'}];
    const [canCreateAlbums, setCanCreateAlbums] = useState(group.policies.canCreateAlbums);
    const canCreateAlbumsValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}, {value: 'all', caption: 'All group members'}];
    const [canUploadFiles, setCanUploadFiles] = useState(group.policies.canUploadFiles);
    const canUploadFilesValues = [{value: 'creator', caption: 'Only creator of the group'}, {value: 'administrators', caption: 'Group creator and administrators'}, {value: 'moderators', caption: 'Group creator, administrators and moderators'}, {value: 'all', caption: 'All group members'}];

    return (
            <Formik
                initialValues={{}}
                onSubmit = {async () => {
                    const policiesData = {userId: currentUser._id, isPrivate: isPrivate === 'false' ? false : true, isFreeJoin: isFreeJoin === 'false' ? false : true, canEditGroupInfo: canEditGroupInfo, canEditGroupPolicies: canEditGroupPolicies, canDeleteGroup: canDeleteGroup, canUpdateUserLevels: canUpdateUserLevels, canDeleteDiscussions: canDeleteDiscussions, canBanUsers: canBanUsers, canAcceptJoinRequests: canAcceptJoinRequests, canDeletePosts: canDeletePosts, canSetEvents: canSetEvents, canCreatePosts: canCreatePosts, canCreateDiscussions: canCreateDiscussions, canCreateAlbums: canCreateAlbums, canUploadFiles: canUploadFiles};
                    console.log(policiesData);
                    updateGroupPolicies(group._id, policiesData, token);
                }}
            >
                <Form className={classes.wrapper}>
                    {!isAllowed ? <span className={classes.warning}>Access forbidden: Only group {allowedRoles} can change these settings.</span> : ''}
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Privacy</h5>
                        <span className={classes.inputCaption}>Choose whether to make group content visible for everyone, or only for the members.</span>
                        <DropdownMenu name='isPrivate' disabled={!isAllowed} current={isPrivate} setCurrent={setIsPrivate} values={isPrivateValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Joining</h5>
                        <span className={classes.inputCaption}>Choose whether to make group join free for everyone, or control join to your group through the join requests.</span>
                        <DropdownMenu name='isFreeJoin' disabled={!isAllowed} current={isFreeJoin} setCurrent={setIsFreeJoin} values={isFreeJoinValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group info editing</h5>
                        <span className={classes.inputCaption}>Choose who can edit group info.</span>
                        <DropdownMenu name='canEditGroupInfo' disabled={!isAllowed} current={canEditGroupInfo} setCurrent={setCanEditGroupInfo} values={canEditGroupInfoValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group policy editing</h5>
                        <span className={classes.inputCaption}>Choose who can edit group policies.</span>
                        <DropdownMenu name='canEditGroupPolicies' disabled={!isAllowed} current={canEditGroupPolicies} setCurrent={setCanEditGroupPolicies} values={canEditGroupPoliciesValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group deletion</h5>
                        <span className={classes.inputCaption}>Choose who can delete group.</span>
                        <DropdownMenu name='canDeleteGroup' disabled={!isAllowed} current={canDeleteGroup} setCurrent={setCanDeleteGroup} values={canDeleteGroupValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group users promotion and demotion</h5>
                        <span className={classes.inputCaption}>Choose who can promote and demote users.</span>
                        <DropdownMenu name='canUpdateUserLevels' disabled={!isAllowed} current={canUpdateUserLevels} setCurrent={setCanUpdateUserLevels} values={canUpdateUserLevelsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group discussion deletion/closing</h5>
                        <span className={classes.inputCaption}>Choose who can delete and close group discussions.</span>
                        <DropdownMenu name='canDeleteDiscussions' disabled={!isAllowed} current={canDeleteDiscussions} setCurrent={setCanDeleteDiscussions} values={canDeleteDiscussionsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group users block/unblock</h5>
                        <span className={classes.inputCaption}>Choose who can block and unblock users.</span>
                        <DropdownMenu name='canBanUsers' disabled={!isAllowed} current={canBanUsers} setCurrent={setCanBanUsers} values={canBanUsersValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group user request accepting/declining</h5>
                        <span className={classes.inputCaption}>Choose who can accept or decline user requests.</span>
                        <DropdownMenu name='canAcceptJoinRequests' disabled={!isAllowed} current={canAcceptJoinRequests} setCurrent={setCanAcceptJoinRequests} values={canAcceptJoinRequestsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group feed post deletion</h5>
                        <span className={classes.inputCaption}>Choose who can delete group feed posts.</span>
                        <DropdownMenu name='canDeletePosts' disabled={!isAllowed} current={canDeletePosts} setCurrent={setCanDeletePosts} values={canDeletePostsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group event management</h5>
                        <span className={classes.inputCaption}>Choose who can create, edit and delete group events.</span>
                        <DropdownMenu name='canSetEvents' disabled={!isAllowed} current={canSetEvents} setCurrent={setCanSetEvents} values={canSetEventsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group feed posts creation</h5>
                        <span className={classes.inputCaption}>Choose who can create new group feed posts.</span>
                        <DropdownMenu name='canCreatePosts' disabled={!isAllowed} current={canCreatePosts} setCurrent={setCanCreatePosts} values={canCreatePostsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group discussion creation</h5>
                        <span className={classes.inputCaption}>Choose who can create new group discussion.</span>
                        <DropdownMenu name='canCreateDiscussions' disabled={!isAllowed} current={canCreateDiscussions} setCurrent={setCanCreateDiscussions} values={canCreateDiscussionsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group albums management</h5>
                        <span className={classes.inputCaption}>Choose who can manage group picture albums.</span>
                        <DropdownMenu name='canCreateAlbums' disabled={!isAllowed} current={canCreateAlbums} setCurrent={setCanCreateAlbums} values={canCreateAlbumsValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group files uploading</h5>
                        <span className={classes.inputCaption}>Choose who can upload files (audio, video, pictures, etc.) into the group.</span>
                        <DropdownMenu name='canUploadFiles' disabled={!isAllowed} current={canUploadFiles} setCurrent={setCanUploadFiles} values={canUploadFilesValues}/>
                    </div>
                    <SimpleButton type='submit' disabled={!isAllowed}>Apply policies</SimpleButton>
                </Form>
            </Formik>
    );
};

export default PoliciesSettings;