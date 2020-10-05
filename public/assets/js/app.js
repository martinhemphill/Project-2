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

$('select').on('change', function (event) {
  event.preventDefault();
  console.log($('#bookInput').val());
});

$('option').on('click', function () {
  console.log(window.userId);
});

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
    followerID: window.user,
    followeeID: $('#div-name-placeholder')
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
