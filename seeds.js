var mongoose    = require("mongoose");
var Webseries   = require("./models/webseries");
var Comment     = require("./models/comment");
 
var data = [
    {
        name: "The Wandering Inn", 
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Mother of Learning", 
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Worm", 
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all webseries
   Webseries.remove({}, (err) =>{
        if(err){
            console.log(err);
        }
        console.log("removed webseries!");

        Comment.remove({}, (err) =>{
            if(err){
                console.log(err)
            }
            console.log("removed comments!")
        })
        //add a few webseries
        // data.forEach((seed) =>{
        //     Webseries.create(seed, (err, webseries) =>{
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a webseires");
        //             // Create a comment
        //             Comment.create(
        //                 {
        //                     text: "This series is great!",
        //                     author: "John"
        //                 }, (err, comment) => {
        //                     if (err) {
        //                         console.log(err)
        //                     } else {
        //                         webseries.comments.push(comment)
        //                         webseries.save()
        //                         console.log("Comment made!")
        //                     }
        //                 }
        //                 )
        //         }
        //     });
        // });
    }); 
}
 
module.exports = seedDB;