// Project 1: Twitter Clone

// Below are some APIs to use to build atwitter clone. Check the demo for more. 

// USERS 
// https://jsonplaceholder.typicode.com/users 

// POSTS 
// https://jsonplaceholder.typicode.com/posts 
//  OR (https://jsonplaceholder.typicode.com/posts?userId=1) 

// COMMENTS 
// https://jsonplaceholder.typicode.com/comments 
//  OR (https://jsonplaceholder.typicode.com/comments?postId=1) 


// Task 
// Consume the users API and print all users by username on a select box (by default, display user with ID one) 
// On selecting a User Display the post that user has (by default, display user with ID 1) 
// On selecting a Post show all its comments. (by default, display comments for post with ID 1) 

// DEMO  
// https://twitter-signals-7iou.vercel.app/ 




// interfaces user, posts and comments 
interface User{

    id:number,
    name:string,
    username:string,
    email:string,
    address: {
        street:string,
        suite:string,
        city:string,
        zipcode:string,
        geo:{
            lat:string,
            lng:string
        },
    },
    phone:string,
    website:string,
    company:{
        name:string,
        catchPhrase:string,
        bs:string
    }
}

interface Post{
    userId:number,
    id:number,
    title:string,
    body:string


}

interface Comment{
    postId: number,
    id: number,
    name: string,
    email:string,
    body:string
    
}

//select dom element from the html
const pickUser = document.getElementById("pickUser") as HTMLSelectElement;
//selectinguser 
const userDetails = document.getElementById("userdetail") as HTMLUListElement
//post
const userPost = document.getElementById("user-post") as HTMLUListElement;
//comments
const userComments = document.getElementById("user-comment") as HTMLUListElement;
//userdetails call


// function to get  all users
let userURL: User[];
const getAllUsers = async ()=>{
    const userUrl = await fetch('https://jsonplaceholder.typicode.com/users');
    //sending the request
    if(userUrl.ok){
        userURL = await userUrl.json();
        userURL.forEach((user) =>{
            // create an option element 
            const avaialableOption = document.createElement('option');
            avaialableOption.value = user.id.toString()
            avaialableOption.textContent = user.name;
            pickUser.appendChild(avaialableOption)
        });
        // pick user with value of 1 to be defauled displayed 
        pickUser.value = '1'
        getUserPost(1);
        getUserDetails(1);
        getUserComment(1)
    }
}

//function to get user post
let postURL: Post[];
const getUserPost = async(userId: number)=>{
    const postUrl = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if(postUrl.ok){
        postURL = await postUrl.json();

        //make the innerHTML of the post and comment empty
        userPost.innerHTML = '';
        userComments.innerHTML = '';
        //loop through the post
        postURL.forEach(post =>{
            const postListElement = document.createElement('li')        

            const image = document.createElement('div');
            image.className = 'com-image';
            image.innerHTML = ""
            const imageDiv = document.createElement('div') //div for images
            const image123 = document.createElement('img') //its on its own
            image123.src = "/src/images/boseman.png"
            const leftDiv = document.createElement('div') //left
            const pdiv = document.createElement('div');
            pdiv.className = "pElements"
            const message = document.createElement('p')
            message.textContent = '200'
            const share = document.createElement('p')
            share.textContent = '200'
            const love = document.createElement('p')
            love.textContent = '200'
            // commentListElement.textContent = `${comments.email} ${comments.body}`
            postListElement.textContent = `${post.title} -${post.body}`;
            
            imageDiv.appendChild(image123)
            leftDiv.appendChild(postListElement)
            leftDiv.appendChild(pdiv)
            
            image.appendChild(imageDiv)
            image.appendChild(leftDiv)
            pdiv.appendChild(message);
            pdiv.appendChild(share);
            pdiv.appendChild(love)
            




            userPost.appendChild(image);
            postListElement.addEventListener('click', ()=>{
            getUserComment(post.id)
            });
        });
    };
};

const getUserDetails = (userId:number)=>{
    // loop 
    const user = userURL.find(user => user.id === userId)
    if(user){
        userDetails.innerHTML = '';
        const userDetail = [
            `${user.email}`,
            `@${user.username}`,
            `${user.company.catchPhrase}`,
            `${user.address.city}`
        ]
        // loop 
        userDetail.forEach(details =>{
            const userLists = document.createElement('li')
            userLists.textContent = details
            userDetails.appendChild(userLists);

        })
    }
}

//function to get the comment
let commentURL : Comment[]
const getUserComment = async(postId:number)=>{
    const commentUrl = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    if(commentUrl.ok){
        commentURL = await commentUrl.json();
        userComments.innerHTML = '';


        commentURL.forEach(comments =>{
            const image = document.createElement('div');
            image.className = 'com-image';
            image.innerHTML = ""
            const imageDiv = document.createElement('div') //div for images
            const image123 = document.createElement('img') //its on its own
            image123.src = "/src/images/boseman.png"
            const leftDiv = document.createElement('div') //left
            const commentListElement = document.createElement('li');
            const pdiv = document.createElement('div');
            pdiv.className = "pElements"
            const message = document.createElement('p')
            message.textContent = '0'
            const share = document.createElement('p')
            share.textContent = '0'
            const love = document.createElement('p')
            love.textContent = '0'
            commentListElement.textContent = `${comments.email} ${comments.body}`
            
            imageDiv.appendChild(image123)
            leftDiv.appendChild(commentListElement)
            leftDiv.appendChild(pdiv)
            
            image.appendChild(imageDiv)
            image.appendChild(leftDiv)
            pdiv.appendChild(message);
            pdiv.appendChild(share);
            pdiv.appendChild(love)
            
            
            userComments.appendChild(image);

        });

    }
}

// addEventListener to the select drop down change 
pickUser.addEventListener('change', ()=>{
    const pickedUserId = parseFloat(pickUser.value)
    getUserPost(pickedUserId)
    getUserDetails(pickedUserId)
})

getAllUsers();