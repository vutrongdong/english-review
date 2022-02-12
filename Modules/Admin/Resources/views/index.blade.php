<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>test laravel reactjs</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('admin/css/fontawesome.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('admin/css/adminlte.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/style.css') }}">
    <link rel="icon" href="{{ asset('images/favicon.png') }}" type="image/x-icon" />
</head>
<body class="sidebar-mini layout-fixed">
    <div id="app"></div>
    <script>
        @auth
        window.$auth = {!! json_encode([
            'csrfToken' => csrf_token(),
            'user' => authUser(),
            // 'permissions' => getCurrentLoginUser()->authorities
        ]) !!};
        @endauth
    </script>
    <!-- jQuery -->
    <script src="{{ asset('admin/js/jquery.min.js') }}"></script>
    <!-- AdminLTE App -->
    <script src="{{ asset('admin/js/adminlte.js') }}"></script>
    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>

