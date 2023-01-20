export function getPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          imageUrl: "images/cartoon1.webp",
          caption: "All the starts",
          user: {
            name: "Suresh",
            username: "suresh12",
          },
          isLiked: true,
          isBookMarked: false,
          likes: {
            count: 6,
            likedBy: [
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
            ],
          },
          comments: [
            {
              user: {
                name: "Jake",
                username: "jakezing",
              },
              comment: "Nice....",
            },
          ],
        },
        {
          imageUrl: "images/cartoon2.webp",
          caption: "All the starts",
          user: {
            name: "Aakash",
            username: "aakash124",
          },
          isLiked: true,
          isBookMarked: false,
          likes: {
            count: 6,
            likedBy: [
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
            ],
          },
          comments: [
            {
              user: {
                name: "Jake",
                username: "jakezing",
              },
              comment: "Good one dear...",
            },
          ],
        },
        {
          imageUrl: "images/cartoon3.jpeg",
          caption: "All the starts",
          user: {
            name: "Shyam",
            username: "shyam2",
          },
          isLiked: true,
          isBookMarked: false,
          likes: {
            count: 6,
            likedBy: [
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
            ],
          },
          comments: [
            {
              user: {
                name: "Jake",
                username: "jakezing",
              },
              comment: "Awesome..",
            },
          ],
        },
        {
          imageUrl: "images/cartoon4.png",
          caption: "All the starts",
          user: {
            name: "Ramesh",
            username: "ramesh12",
          },
          isLiked: false,
          isBookMarked: false,
          likes: {
            count: 6,
            likedBy: [
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
            ],
          },
          comments: [
            {
              user: {
                name: "Jake",
                username: "jakezing",
              },
              comment: "Nice one....",
            },
          ],
        },
        {
          imageUrl: "images/cartoon5.jpeg",
          caption: "All the starts",
          user: {
            name: "Jignesh",
            username: "jignesh12",
          },
          isLiked: false,
          isBookMarked: false,
          likes: {
            count: 6,
            likedBy: [
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
            ],
          },
          comments: [
            {
              user: {
                name: "Jake",
                username: "jakezing",
              },
              comment: "Great picture!",
            },
          ],
        },
        {
          imageUrl: "images/cartoon6.png",
          caption: "All the starts",
          user: {
            name: "Parth",
            username: "parth32",
          },
          isLiked: false,
          isBookMarked: false,
          likes: {
            count: 6,
            likedBy: [
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
              {
                name: "Jake",
                username: "jakezing",
              },
            ],
          },
          comments: [
            {
              user: {
                name: "Jake",
                username: "jakezing",
              },
              comment: "great effort!",
            },
          ],
        },
      ]);
    }, 1000);
  });
}

const USERS = [
  {
    userEmail: "jake@gmail.com",
    userPassword: "123456",
    userName: "jake1029910",
  },
  {
    userEmail: "jill@gmail.com",
    userPassword: "7890123",
    userName: "jilljack",
  },
];

export function login(email, password) {
  return new Promise((resolve, reject) => {
    // check if email and password are correct

    let index = -1;
    USERS.forEach((item, i) => {
      if (item.userEmail === email && item.userPassword === password) {
        resolve(item);
        index = i;
      }
    });
    reject();
  });
}

export function signup(email, password, userName) {
  return new Promise((resolve, reject) => {
    //check if username or email already exists
    USERS.forEach((item, i) => {
      if (item.userEmail === email && item.userPassword === password && item.userName === userName) {
        reject();
      }
    });

    //else push data to USERS
    let newUser = { userEmail: email, userPassword: password, userName };
    USERS.push(newUser);
    resolve(newUser);
  });
}
