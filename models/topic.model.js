const mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    title:{
        type: String,
        require : 'Khong duoc bo trong'
    },
    urlTitle:{
        type: String
    },
    sortContent:{
        type: String,
        require : 'Khong duoc bo trong'
    },
    fullContent: {
        type: String,
        require : 'Khong duoc bo trong'
    },
    location: {
        type: String,
        require : 'Khong duoc bo trong'
    },
    isHot : {
        type: Boolean
    },
    smallImageUrl:{
        type: String
    },
    largeImageUrl:{
        type: String
    },
    category: {
        type: String
    },
    author:{
        type: String
    },
    time: {
        type: String
    }
});

mongoose.model('Topic',topicSchema);