$(document).ready(function () {
  $('.submit-search').on('click', function () {
    const param = $('.search-field').val();

    findBook('title', param);
  });

  const seedBooks = ['cat', 'earth', 'run', 'fire', 'hunger', 'Winter', 'world', 'tomorrow', 'the', 'turn', 'fly', 'moon', 'tales', 'dog', 'star', 'power', 'catch', 'feel', 'house', 'event', 'game', 'valor', 'war', 'prince', 'woman', 'man', 'pirate', 'fish', 'fantasy', 'stories', 'evil', 'good', 'truth'];

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

  const randomBook = seedBooks[Math.floor(Math.random() * seedBooks.length)];
  const searchTerm = $('#searchBook').val();
  console.log(searchTerm);

  $('.refreshBtn').on('click', function () {
    findBook('title', randomBook);
  });

  function findBook (val, query) {
    const queryURL = 'https://www.googleapis.com/books/v1/volumes?q=in' + val + ':' + query + '&key=AIzaSyAGwS80on7Jfqi4kEejw10c-FfiMIUDj_I';
    console.log(queryURL);
    $.ajax({
      type: 'GET',
      url: queryURL
    }).then((response) => {
      $('.title-author').remove();
      $('.book-description').remove();
      $('.book-image').remove();

      // First Card
      const bookTitle5 = response.items[0].volumeInfo.title;
      const author5 = response.items[0].volumeInfo.authors[0];
      const description5 = response.items[0].volumeInfo.description;
      const image5 = response.items[0].volumeInfo.imageLinks.thumbnail;
      const date5 = response.items[0].volumeInfo.publishedDate;

      // Second Card
      const bookTitle6 = response.items[1].volumeInfo.title;
      const author6 = response.items[1].volumeInfo.authors[0];
      const description6 = response.items[1].volumeInfo.description;
      const image6 = response.items[1].volumeInfo.imageLinks.thumbnail;
      const date6 = response.items[1].volumeInfo.publishedDate;

      // Third Card
      const bookTitle7 = response.items[2].volumeInfo.title;
      const author7 = response.items[2].volumeInfo.authors[0];
      const description7 = response.items[2].volumeInfo.description;
      const image7 = response.items[2].volumeInfo.imageLinks.thumbnail;
      const date7 = response.items[2].volumeInfo.publishedDate;

      const titleAuthorSpace5 = $('<h5>').attr('class', `title-author`).attr('id', `${date5}`).html(`${bookTitle5} | ${author5}`);
      const titleAuthorSpace6 = $('<h5>').attr('class', `title-author`).attr('id', `${date6}`).html(`${bookTitle6} | ${author6}`);
      const titleAuthorSpace7 = $('<h5>').attr('class', `title-author`).attr('id', `${date7}`).html(`${bookTitle7} | ${author7}`);
      const descSpace5 = $('<p>').attr('class', 'book-description desc5').html(`${description5}`);
      const descSpace6 = $('<p>').attr('class', 'book-description desc6').html(`${description6}`);
      const descSpace7 = $('<p>').attr('class', 'book-description desc7').html(`${description7}`);
      const imgSpace5 = $('<img>').attr('src', image5).attr('class', 'book-image');
      const imgSpace6 = $('<img>').attr('src', image6).attr('class', 'book-image');
      const imgSpace7 = $('<img>').attr('src', image7).attr('class', 'book-image');

      $('#cardBody5').prepend(titleAuthorSpace5, descSpace5);
      $('.imgDiv5').append(imgSpace5);
      $('#cardBody6').prepend(titleAuthorSpace6, descSpace6);
      $('.imgDiv6').append(imgSpace6);
      $('#cardBody7').prepend(titleAuthorSpace7, descSpace7);
      $('.imgDiv7').append(imgSpace7);
    }).catch(error => {
      console.log(error);
    });
  };

  $('select').on('change', function (event) {
    event.preventDefault();
    console.log($(this).val());

    const taCarry = $(this).parent().parent().siblings().html();
    const descCarry = $(this).parent().parent().siblings().next().html();
    const photoCarry = $(this).parent().parent().parent().parent().siblings().html();
    const yearCarry = $(this).val();
    const titleCarry = taCarry.substring(0, taCarry.indexOf('|')).trim();
    const authorCarry = taCarry.substring(taCarry.indexOf('|') + 1, taCarry.length).trim();

    const data = {
      title: titleCarry,
      author: authorCarry,
      photo: photoCarry,
      description: descCarry,
      year: yearCarry
    };
    $.ajax({
      type: 'POST',
      url: '/api/books',
      data: data
    }).then(function (res) {
      console.log(res, res.year, window.userId);
      addToList(res.year, res.title, res.id);
    });
  });

  $('.user-connection').on('click', function () {
    const userTarget = ($(this).attr('id'));
    console.log('user target', userTarget);
    const pastArr = [];
    const currentArr = [];
    const futureArr = [];
    $.ajax({
      type: 'GET',
      url: 'api/lists'
    }).then(function (res) {
      $('.modal-books').empty();
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        if (res[i].UserId.toString() === userTarget && res[i].state === 'past') {
          pastArr.push(res[i]);
        } else if (res[i].UserId.toString() === userTarget && res[i].state === 'current') {
          currentArr.push(res[i]);
        } else if (res[i].UserId.toString() === userTarget && res[i].state === 'future') {
          futureArr.push(res[i]);
        }
      };
      console.log('pastArr length is ', pastArr.length, 'current is ', currentArr.length, 'and future is ', futureArr.length);
      const pastHeading = $('<ul>').attr('class', 'connection-book-header').text('Books I have read' + '<hr />');
      const currentHeading = $('<ul>').attr('class', 'connection-book-header').text('Books I am currently reading' + '<hr />');
      const futureHeading = $('<ul>').attr('class', 'connection-book-header').text('Books I would like to read');

      for (let i = 0; i < pastArr.length; i++) {
        const pastBook = $('<p>').attr('class', 'connection-book-name').text(pastArr[i].title);
        pastHeading.append(pastBook);
      };
      for (let i = 0; i < currentArr.length; i++) {
        const currentBook = $('<p>').attr('class', 'connection-book-name').text(currentArr[i].title);
        currentHeading.append(currentBook);
      };
      for (let i = 0; i < futureArr.length; i++) {
        const futureBook = $('<p>').attr('class', 'connection-book-name').text(futureArr[i].title);
        futureHeading.append(futureBook);
      };

      $('.modal-books').append(pastHeading, currentHeading, futureHeading);
    });
  });

  function addToList (state, name, book) {
    const data = {
      state: state,
      title: name,
      UserId: window.userId,
      BookId: book
    };
    $.ajax({
      type: 'POST',
      url: '/api/lists',
      data: data
    }).then(function (res) {
      console.log(res);
    });
  }

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

  // ========GET=========

  // function to get users followers
  $('.btnFollowers').on('click', function getFollowers () {
    // const user = window.user;
    $.ajax({
      type: 'GET',
      url: '/api/connections/'
    }).then(function (res) {
      const followerList = $('<ul>');
      for (let i = 0; i < res.length; i++) {
        const oneFollower = $('<li>').text(`${res.User.firstName} ${res.User.lastName}`);
        followerList.append(oneFollower);
      }
      $('#myModal1').append(followerList).css('z-index', '2');
    });
  });

  // function to see who the user is following
  $('.btnFollowing').on('click', function getFollowing () {
    // const user = window.user;
    $.ajax({
      type: 'GET',
      url: '/api/connections/'
    }).then(function (res) {
      const followingList = $('<ul>');
      for (let i = 0; i < res.length; i++) {
        const oneFollower = $('<li>').text(`${res.User.firstName} ${res.User.lastName}`);
        followingList.append(oneFollower);
      }
      $('#myModal3').append(followingList).css('z-index', '2');
    });
  });

  // function to get user information

  // ========DELETE========
  $('.fake-class').on('click', function () {
    const entryId = $(this).attr('id');
    console.log($(this).parent());
    console.log(entryId);
    $.ajax({
      type: 'DELETE',
      url: `api/lists/${entryId}`,
      data: entryId
    }).then(function (result) {
      location.reload();
      console.log(result);
    });
  });
});
