<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= base_url('public/css/navbar.css') ?>">
</head>
<body>
    <!-- Corrected Navbar -->
            <nav class="navbar navbar-expand-lg" id="navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" href="<?= base_url('DashboardController/about')?>" id="rsg-image-logo"></a>
                    <button class="navbar-toggler navbar-toggler-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <i class="fas fa-bars" style="color:aliceblue"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarContent">
                        <!-- Rest of your navbar content remains the same -->
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item"><a class="nav-link" href="<?= base_url('DashboardController/about')?>">About</a></li>
                            <li class="nav-item"><a class="nav-link" href="<?= base_url('DashboardController')?>">Dashboard</a></li>
                            <li class="nav-item"><a class="nav-link" href="<?= base_url('DashboardController/reservation')?>">Seat Reservation</a></li>
                            <li class="nav-item"><a class="nav-link" href="<?= base_url('DashboardController/faqs')?>">FAQs</a></li>
                        </ul>
                        <div class="d-flex align-items-center">
                            <button id="account-profile">
                                <i class="fa-regular fa-circle-user"></i>
                            </button>
                            <h5 id="account-name" class="mb-0">Adamma</h5>
                        </div>
                        <script>
                        document.getElementById("account-profile").addEventListener("click", function () {
                            window.location.href="<?= base_url('DashboardController/account')?>"; // Adjust path as needed
                        });
                        </script>
                    </div>
                </div>
            </nav>    
        <?= $this->renderSection("content");?>
</body>
</html>
