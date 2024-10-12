import id1 from '../assets/PODs/single1.jpg';
import id2 from '../assets/PODs/single2.jpg';
import id3 from '../assets/PODs/double1.jpg';
import id4 from '../assets/PODs/double2.jpg';
import id5 from '../assets/PODs/group1.jpg';
import id6 from '../assets/PODs/group2.jpg';
import id7 from '../assets/PODs/meeting1.jpg';
import id8 from '../assets/PODs/meeting2.jpg';

export const STOREs = [
    {
        Id: 1,
        StoreName: 'Cơ sở 1',
    },
    {
        Id: 2,
        StoreName: 'Cơ sở 2',
    },
]
export const PODs = [
    {
        Id: 1,
        PodName: 'POD cao cấp',
        TypeName: 'Single',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 1,
        StoreName: 'Cơ sở 1',
        capacity: 1,
        rating: 5,
        img: id1,
        description: 'ABC bla bla bla ~',
        status: 'Available',
    },
    {
        Id: 2,
        PodName: 'POD cao cấp',
        TypeName: 'Single',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 1,
        StoreName: 'Cơ sở 1',
        capacity: 1,
        rating: 5,
        img: id2,
        description: 'ABC bla bla bla ~',
        status: 'Unavailable',
    },
    {
        Id: 3,
        PodName: 'POD cao cấp',
        TypeName: 'Double',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 1,
        StoreName: 'Cơ sở 1',
        capacity: 2,
        rating: 4,
        img: id3,
        description: 'ABC bla bla bla ~',
        status: 'Available',
    },
    {
        Id: 4,
        PodName: 'POD cao cấp',
        TypeName: 'Double',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 2,
        StoreName: 'Cơ sở 2',
        capacity: 2,
        rating: 5,
        img: id4,
        description: 'ABC bla bla bla ~',
        status: 'Available',
    },
    {
        Id: 5,
        PodName: 'POD cao cấp',
        TypeName: 'Group',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 2,
        StoreName: 'Cơ sở 2',
        capacity: 6,
        rating: 4,
        img: id5,
        description: 'ABC bla bla bla ~',
        status: 'Available',
    },
    {
        Id: 6,
        PodName: 'POD cao cấp',
        TypeName: 'Group',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 2,
        StoreName: 'Cơ sở 2',
        capacity: 6,
        rating: 4,
        img: id6,
        description: 'ABC bla bla bla ~',
        status: 'Available',
    },
    {
        Id: 7,
        PodName: 'POD cao cấp',
        TypeName: 'Meeting',
        UtilityName: 'Bảng trắng thông minh',
        StoreId: 2,
        StoreName: 'Cơ sở 2',
        capacity: 10,
        rating: 5,
        img: id7,
        description: 'ABC bla bla bla ~',
        status: 'Unavailable',
    },
]