<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>LearnEnglish</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('web/img/favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('web/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/slick.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/fontawesome-all.min.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('web/css/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/home.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/mystyle.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/menu.css') }}">
    <link rel="stylesheet" href="{{ asset('web/css/auth.css') }}">
</head>
<body>
    <div id="web"></div>
    <script>
        @auth
        window.$auth = {!! json_encode([
            'csrfToken' => csrf_token(),
            'user' => authUser()
        ]) !!};
        @endauth
    </script>
    <script src="{{ asset('web/js/jquery-1.12.4.min.js') }}"></script>
    <script src="{{ asset('web/js/jquery-stickyNavigator.js') }}"></script>
    <script src="{{ asset('web/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('web/js/slick.min.js') }}"></script>
    <script src="{{ asset('web/js/jquery.scrollUp.min.js') }}"></script>
    <script src="{{ asset('web/js/main.js') }}"></script>
    <script src="{{ asset('js/web.js') }}" defer></script>
</body>
</html>
