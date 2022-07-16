export const transformTagString = (tagString) => {
    let tagArray, tags = [];
    if(tagString.trim() !== ""){
        tagArray = tagString.split(' ');
        tagArray.forEach(tag => {
            if(tag.startsWith('#')) tags.push(tag);
            else tags.push(`#${tag}`);
        });
    }
    return tags;
}