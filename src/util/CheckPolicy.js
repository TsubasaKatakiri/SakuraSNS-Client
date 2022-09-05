export const checkPolicy = (group, userId, actionLevel) => {
    let check = false;
    switch(actionLevel){
        case 'creator':
            check = (group.creator.toString() === userId);
            break;
        case "administrators":
            check = (checkObjectIdInArray(group.administrators, userId)
                    || group.creator.toString() === userId);
            break;
        case "moderators":
            check = (group.creator.toString() === userId 
                    || checkObjectIdInArray(group.administrators, userId)
                    || checkObjectIdInArray(group.moderators, userId))
            break;
        default:
            check = group.members.filter(m => m._id === userId).length > 0;
            break;
    }
    return check;
}

export const checkIfAdministrative = (group, userId) => {
    return group.creator.toString() === userId || checkObjectIdInArray(group.administrators, userId) || checkObjectIdInArray(group.moderators, userId);
}

export const checkIsMember = (group, userId) => {
    return checkObjectIdInArray(group.members, userId);
}

export const getAllowedRoles = (actionLevel) => {
    return  actionLevel === 'creator' ? 'creator' 
            : actionLevel === 'administrators' ? 'creator and administrators'
            : actionLevel === 'moderators' ? 'creator, administrators and moderators'
            : 'users of the group';
}

export const checkUserLevel = (group, userId) => {
    let level = 'member';
    if(checkObjectIdInArray(group.moderators, userId)) level = 'moderator';
    if(checkObjectIdInArray(group.administrators, userId)) level = 'administrator';
    if(group.creator === userId) level = 'creator';
    return level;
}

export const checkIsBanned = (group, userId) => {
    return group.bans.filter(m => m._id === userId).length > 0;
}

const checkObjectIdInArray = (arr, userId) => {
    return arr.filter(m => m._id === userId).length > 0;
}