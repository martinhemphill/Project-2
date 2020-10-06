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

function getBookInfo (req, res) {
  let searchTitle = '';

  $('.view-books').on('click', function (title) {
    // eslint-disable-next-line no-unused-vars
    searchTitle = $('#search-value').val();
    const queryURL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + searchTitle + '&key=AIzaSyAGwS80on7Jfqi4kEejw10c-FfiMIUDj_I';

    $.ajax({
      type: 'GET',
      url: queryURL
    }).then((response) => {
      const bookTitle = response.items[0].volumeInfo.title;
      const author = response.items[0].volumeInfo.authors[0];
      const description = response.items[0].volumeInfo.description;
      const bookId = response.items[0].id;
      const image = response.items[0].volumeInfo.imageLinks.thumbnail;
      console.log(`${bookId} \n \n${bookTitle} \n \n${author} \n \n${description} \n \n${image}`);
      const output = `<p>${bookTitle} \n \n${author} \n \n${description} \n \n${image}</p>`;

      const textArea = $('#data-output').html(output);

      textArea.innerText = output;
    }).catch(error => {
      console.log(error);
    });
  });
};
getBookInfo();

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

$('.followers').on('click', function getFollowers() {
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

function getUserListFuture (id) {
  $.ajax({
    type: 'GET',
    url: `/api/readFuture/${id}`
  }).then(function (res) {
    const futureList = $('<ul>');
    $('#cardBody4').append(futureList)
    for (let i = 0; i < res.length; i++) {
      const futureItem = $('<li>').html(res.Book.title);
      futureList.append(futureItem);
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

function deleteFromCurrent() {
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

function deleteFromFuture() {
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

