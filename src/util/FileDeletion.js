import { ref, deleteObject } from 'firebase/storage';
import storage from '../storage/firebase';

export const deleteSingleFile = async (path) => {
    const deletionRef = ref(storage, path);
    await deleteObject(deletionRef);
}