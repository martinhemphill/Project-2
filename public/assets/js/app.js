$('#add-user').on('click', function (event) {
  event.preventDefault();

  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// Get book info ***************************************************

// function getBookInfo (req, res) {
//   let searchTitle = 'gonzo';

$('.view-books').on('click', function (event) {
  event.preventDefault();
  console.log(`we clicked view books!`);
  // eslint-disable-next-line no-unused-vars
  // $('#search-value').val();
  const searchTitle = 'gonzo';
  const queryURL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + searchTitle + '&key=AIzaSyAGwS80on7Jfqi4kEejw10c-FfiMIUDj_I';
  console.log(queryURL);
  $.ajax({
    type: 'GET',
    url: queryURL
  }).then((response) => {
    // First Card
    const bookTitle5 = response.items[0].volumeInfo.title;
    const author5 = response.items[0].volumeInfo.authors[0];
    const description5 = response.items[0].volumeInfo.description;
    // const bookId = response.items[0].id;
    const image5 = response.items[0].volumeInfo.imageLinks.thumbnail;

    // Second Card
    const bookTitle6 = response.items[1].volumeInfo.title;
    const author6 = response.items[1].volumeInfo.authors[0];
    const description6 = response.items[1].volumeInfo.description;
    // const bookId = response.items[0].id;
    const image6 = response.items[1].volumeInfo.imageLinks.thumbnail;

    // Third Card
    const bookTitle7 = response.items[2].volumeInfo.title;
    const author7 = response.items[2].volumeInfo.authors[0];
    const description7 = response.items[2].volumeInfo.description;
    // const bookId = response.items[0].id;
    const image7 = response.items[2].volumeInfo.imageLinks.thumbnail;

    const titleAuthorSpace5 = $('<h5>').attr('class', 'title-author').html(`${bookTitle5} | ${author5}`);
    const titleAuthorSpace6 = $('<h5>').attr('class', 'title-author').html(`${bookTitle6} | ${author6}`);
    const titleAuthorSpace7 = $('<h5>').attr('class', 'title-author').html(`${bookTitle7} | ${author7}`);
    const descSpace5 = $('<p>').attr('class', 'book-description').html(`${description5}`);
    const descSpace6 = $('<p>').attr('class', 'book-description').html(`${description6}`);
    const descSpace7 = $('<p>').attr('class', 'book-description').html(`${description7}`);
    const imgSpace5 = $('<img>').attr('src', image5);
    const imgSpace6 = $('<img>').attr('src', image6);
    const imgSpace7 = $('<img>').attr('src', image7);

    $('#cardBody5').append(titleAuthorSpace5, descSpace5);
    $('.imgDiv5').append(imgSpace5);
    $('#cardBody6').append(titleAuthorSpace6, descSpace6);
    $('.imgDiv6').append(imgSpace6);
    $('#cardBody7').append(titleAuthorSpace7, descSpace7);
    $('.imgDiv7').append(imgSpace7);

    // console.log(`${bookId} \n \n${bookTitle} \n \n${author} \n \n${description} \n \n${image}`);
    // const output = `<p>${bookTitle} \n \n${author} \n \n${description} \n \n${image}</p>`;
    // const textArea = $('#data-output').html(output);

    // textArea.innerText = output;
  }).catch(error => {
    console.log(error);
  });
});
// };
// getBookInfo();

// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal').on('click', function (event) {
  event.preventDefault();
  $('#user-info').modal('show');
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/dashboard');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#user-info').modal('hide');
    }
  });
});

$('.profile').on('click', getMyInfo(window.userId));

// ========GET=========

// function to get users followers
$('.followers').on('click', function getFollowers () {
  const user = window.user;
  $.ajax({
    type: 'GET',
    url: `/api/connections/${user}`
  }).then(function (res) {
    const followerList = $('<ul>');
    for (let i = 0; i < res.length; i++) {
      const oneFollower = $('<li>').text(`${res.User.firstName} ${res.User.lastName}`);
      followerList.append(oneFollower);
    }
    $('.modal-body').append(followerList).css('z-index', '2');
  });
});

// function to get user information
function getMyInfo (id) {
  const user = id;
  $.ajax({
    type: 'GET',
    url: `/api/userInfo/${user}`
  }).then(function (res) {
    const joinDate = new Date(res.createdAt);
    const memberSince = joinDate.toLocaleDateString();
    $('member-since').append(memberSince);
  });
};

// function to get the users want to read list
function getUserListFuture (id) {
  $.ajax({
    type: 'GET',
    url: `/api/readFuture/${id}`
  }).then(function (res) {
    const futureList = $('<ul>');
    $('#cardBody4').append(futureList);
    for (let i = 0; i < res.length; i++) {
      const futureItem = $('<li>').html(res.Book.title);
      futureList.append(futureItem);
    }
  });
}

// Function to get the users currently reading list
function getUserListCurrent (id) {
  $.ajax({
    type: 'GET',
    url: `/api/readFuture/${id}`
  }).then(function (res) {
    const currentList = $('<ul>');
    $('#cardBody3').append(currentList);
    for (let i = 0; i < res.length; i++) {
      const currentItem = $('<li>').html(res.Book.title);
      currentList.append(currentItem);
    }
  });
}

// Function to get the users currently reading list
function getUserListPast (id) {
  $.ajax({
    type: 'GET',
    url: `/api/readPast/${id}`
  }).then(function (res) {
    const pastList = $('<ul>');
    $('#cardBody2').append(pastList);
    for (let i = 0; i < res.length; i++) {
      const pastItem = $('<li>').html(res.Book.title);
      pastList.append(pastItem);
    }
  });
}

// function to get reviews
const btn = $('#btnReview');

function getBookReviews (id) {
  $.ajax({
    type: 'GET',
    url: `/api/reviews/${id}`
  }).then(function (res) {
    const reviewsList = $('<ul>');
    $('#modalBody').append(reviewsList);
    for (let i = 0; i < res.length; i++) {
      const reviewItem = $('<li>').html(res.Book.review);
      reviewsList.append(reviewItem);
    }
  });
}

// ========POST========

function addToListFuture () {
  const data = {
    UserId: window.userId,
    BookIsbn: $(this).attr('title')
  };
  $.ajax({
    type: 'POST',
    url: '/api/readFuture',
    data: data
  }).then((result) => {
    console.log(result);
  });
}

function addToListCurrent () {
  const data = {
    UserId: window.userId,
    BookIsbn: $(this).attr('title')
  };
  $.ajax({
    type: 'POST',
    url: '/api/readCurrent',
    data: data
  }).then((result) => {
    console.log(result);
  });
}

function addReview () {
  const data = {
    rating: $('#ratings-div-placeholder').val(),
    comments: $('#comments-div-placeholder').val(),
    BookIsbn: $(this).attr('title'),
    UserId: window.userId
  };
  $.ajax({
    type: 'POST',
    url: '/api/reviews',
    data: data
  }).then(function (data) {
    const user = data.userId;
    const book = data.bookIsbn;

    addToListPast(user, book);
  });
}

function addToListPast (user, book) {
  const data = {
    UserId: user,
    BookIsbn: book
  };
  $.ajax({
    type: 'POST',
    url: '/api/readPast',
    data: data
  }).then(function (result) {
    console.log(result);
  });
};

function followUser () {
  const data = {
    followerID: window.user,
    followeeID: $(this).attr('title')
  };
  $.ajax({
    type: 'POST',
    url: 'api/connections',
    data: data
  }).then(function (result) {
    console.log(result);
  });
}

// function addBookInternal () {
//   const data = {
//     userId: window.user,
//     BookIsbn: $(this).attr('title')
//   };
//   $.ajax({
//     type: 'POST',
//     url: '',
//     data: data
//   }).then(function (result) {
//     console.log(result);
//   });
// }

// ========DELETE========

function unFollow () {
  const data = {
    followerId: window.user,
    followeeId: $('#div-name-placeholder')
  };
  $.ajax({
    type: 'DELETE',
    url: 'api/connections',
    data: data
  }).then(function (result) {
    console.log(result);
  });
}

function deleteFromCurrent () {
  const data = {
    userId: window.user,
    BookIsbn: $('#div-name-placeholder')
  };
  $.ajax({
    type: 'DELETE',
    url: 'api/readCurrent',
    data: data
  }).then(function (result) {
    console.log(result);
  });
}

function deleteFromFuture () {
  const data = {
    userId: window.user,
    BookIsbn: $('#div-name-placeholder')
  };
  $.ajax({
    type: 'DELETE',
    url: 'api/readFuture',
    data: data
  }).then(function (result) {
    console.log(result);
  });
}
