import React from 'react';
import DiscussionListPageHeader from '../DiscussionListPageHeader/DiscussionListPageHeader';
import classes from './DiscussionListPageContent.module.scss';
import DiscussionThumbnail from './../../../GroupPage/GroupContent/DiscussionsWidget/DiscussionThumbnail/DiscussionThumbnail';
import Preloader from '../../../../MinorComponents/Preloader/Preloader';
import DiscussionCreationModal from '../DiscussionCreationModal/DiscussionCreationModal';

const DiscussionListPageContent = ({currentUser, group, discussions, isFetching, error, handleOpen, opened, setOpened, addMethod}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <DiscussionListPageHeader currentUser={currentUser} group={group} handleOpen={handleOpen}/>
            <div className={classes.content}>
                {isFetching || !discussions ? <Preloader/> 
                    : <>{error 
                        ?   <span className={classes.message}>{error}</span>
                        :   <div>
                                {discussions.map(discussion => {
                                    return <DiscussionThumbnail key={discussion._id} discussion={discussion} group={group}/>
                                })}
                            </div>
                        }
                    </>
                }
            </div>
            <DiscussionCreationModal currentUser={currentUser} opened={opened} setOpened={setOpened} addMethod={addMethod}/>
        </div>
    );
};

export default DiscussionListPageContent;