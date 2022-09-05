export const checkUserPrivacy = (userId, profile, actionLevel) => {
    let check = false;
    switch(actionLevel){
        case 'user':
            check = profile._id === userId;
            break;
        case 'followings':
            check = profile.followings.filter(f => f._id === userId).length > 0 || profile._id === userId;
            break;
        default:
            check = !profile.blacklist.includes(userId);
            break;
    }
    return check;
}