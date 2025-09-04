
//Navbar toggle icon
function navbar_toggler() {
    $('.navbar-toggler[data-toggle=collapse]').click(function () {
        if ($(".navbar-toggler[data-bs-toggle=collapse] i").hasClass('fa-bars')) {
        } else {
            $(".navbar-toggler[data-bs-toggle=collapse] i").removeClass("fa-times");
        }
    });
  }
  navbar_toggler();
  
// Navbar clone in mobile device
function navClone() {
    $('.js-clone-nav').each(function () {
        var $this = $(this);
        $this.clone().attr('class', 'navbar-nav ml-auto').appendTo('.d2c_mobile_view_body');
    });

    $('.d2c_mobile_view .nav-link').click(function () {
        $(".nav-link").removeClass("active");
        $('.d2c_mobile_view').removeClass('show');
        $(this).toggleClass('active');
    });
    }
    navClone();

// JS for fancybox Slide & button

function fancybox() {
  $('[data-fancybox]').fancybox({
      protect: true,
      buttons: [
          "fullScreen",
          "thumbs",
          "share",
          "slideShow",
          "close"
      ],
      image: {
          preload: false
      },
  });
}
fancybox();
// Untuk efek khusus saat modal terbuka
document.getElementById('loveLetterModal').addEventListener('shown.bs.modal', function () {
  // Animasi khusus untuk surat
  document.querySelector('#loveLetterModal .modal-body').classList.add('animate__animated', 'animate__fadeIn');
});

// Untuk efek khusus saat modal terbuka
document.getElementById('loveLetterModal').addEventListener('shown.bs.modal', function () {
  // Animasi khusus untuk surat
  document.querySelector('#loveLetterModal .modal-body').classList.add('animate__animated', 'animate__fadeIn');
});

// Tanggal lahir pacar (4 September 2005)
const birthDate = new Date('2005-09-04T00:00:00+07:00'); // GMT+7

function updateCounters() {
    const now = new Date();
    const diff = now - birthDate;
    
    // Hitung waktu yang TEPAT
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Hitung sisa waktu
    const days = totalDays;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    // Update counter
    document.getElementById('seconds-counter').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('minutes-counter').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('hours-counter').textContent = hours.toString().padStart(2, '0');
    document.getElementById('days-counter').textContent = days.toLocaleString();
    
    // Debug info (bisa dihapus)
    console.log(`Sejak 4 September 2005 sampai ${now.toLocaleDateString()}:`);
    console.log(`${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`);
}

// Update setiap detik
setInterval(updateCounters, 1000);

// Inisialisasi pertama kali
updateCounters();

document.addEventListener('DOMContentLoaded', function() {
    // Sembunyikan semua input custom saat halaman dimuat
    document.querySelectorAll('.custom-food-input').forEach(input => {
        input.style.display = 'none';
    });
    
    // Tangani perubahan pada semua dropdown makanan
    document.querySelectorAll('.food-select').forEach(select => {
        select.addEventListener('change', function() {
            const customInput = this.parentElement.querySelector('.custom-food-input');
            if (this.value === 'custom') {
                customInput.style.display = 'block';
            } else {
                customInput.style.display = 'none';
            }
        });
    });
    
    // Tangani klik tombol pesan
    document.querySelectorAll('.btn-select-food').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.food-card');
            const foodType = card.querySelector('.food-header h3').textContent;
            const foodSelect = card.querySelector('.food-select');
            
            // Ambil nilai makanan, jika custom gunakan nilai dari input custom
            let food;
            if (foodSelect.value === 'custom') {
                const customInput = card.querySelector('.custom-food-input input');
                food = customInput.value || "Makanan Custom";
            } else {
                food = foodSelect.value;
            }
            
            const drinkInput = card.querySelector('.drink-input');
            const drink = drinkInput.value || "Terserah kamu";
            
            // Format WhatsApp message
            const message = `*Pesanan Ulang Tahun*\n\n` +
                           `Hai Sayangkuuu...\n` +
                           `Aku mau ini buat ultah aku:\n\n` +
                           `*${foodType}*\n` +
                           `Makanan: ${food}\n` +
                           `Minuman: ${drink}\n\n` +
                           `Ditunggu yaahh😊\n` +
                           `Makasih sayang... Love youuu!`;
            
            // Encode for WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/6281211846570?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    });
});

// Untuk gallery bisa ditambahkan carousel
$('#galleryModal').on('shown.bs.modal', function () {
  $('.modal-body .row').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });
});

// Animasi saat modal muncul
document.getElementById('giftListModal').addEventListener('show.bs.modal', function () {
  const giftCards = document.querySelectorAll('.gift-card');
  giftCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

document.getElementById('giftListModal').addEventListener('shown.bs.modal', function () {
  const giftCards = document.querySelectorAll('.gift-card');
  giftCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
});
// Animasi saat modal muncul
document.getElementById('childhoodPhotosModal').addEventListener('show.bs.modal', function () {
  // Reset animasi
  const photos = document.querySelectorAll('.photo-frame');
  photos.forEach(photo => {
    photo.style.opacity = '0';
    photo.style.transform = 'scale(0.8)';
  });
});

document.getElementById('childhoodPhotosModal').addEventListener('shown.bs.modal', function () {
  // Animasi muncul berurutan
  const photos = document.querySelectorAll('.photo-frame');
  photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.style.opacity = '1';
      photo.style.transform = 'scale(1)';
      photo.style.transition = 'all 0.5s ease';
    }, 100 * index);
  });
});

// Partner Slider
$('.d2c_testimonial_slider').slick({
  centerMode: true,
  centerPadding: '0px',
  dots: false,
  arrows: true,
  infinite: true,
  autoplay:true,
  speed: 1000,
  fade:true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover:false,
  responsive: [
    {
    breakpoint: 1500,
    settings: {
        slidesToShow: 1,
    }
    },
    {
    breakpoint: 992,
    settings: {
        slidesToShow: 1,
    }
    },
    {
    breakpoint: 480,
    settings: {
        slidesToShow: 1,
    }
    }
  ]
});

// Form Validation Js
(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
    })
})();


// Preloader JS
window.addEventListener('load', function() {
    var preloader = document.querySelector('.preloader');
    preloader.classList.add('hide');
});

// ScrollBtn JS
window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
    var scrollBtn = document.getElementById("scrollBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
}

// Counter
$(document).ready(function() {
  var counters = $(".count");
  var countersQuantity = counters.length;
  var counter = [];

  for (i = 0; i < countersQuantity; i++) {
  counter[i] = parseInt(counters[i].innerHTML);
  }

  var count = function(start, value, id) {
  var localStart = start;
  var increment = Math.ceil((value - start) / 100);
  var intervalSpeed = 10;
  var interval = setInterval(function() {
      if (localStart < value) {
      localStart += increment;
      if (localStart > value) {
          localStart = value;
      }
      counters[id].innerHTML = localStart;
      } else {
      clearInterval(interval);
      }
  }, intervalSpeed);
  }

  for (j = 0; j < countersQuantity; j++) {
  count(0, counter[j], j);
}
});

// Load More and Explore More Button JS
function updateSliceShow() {
    var windowWidth = $(window).width();
    var $defaultShow, $sliceShow;
  
    if (windowWidth < 768) {
      $defaultShow = 1;
      $sliceShow = 1;
    } else if (windowWidth < 992) {
      $defaultShow = 2;
      $sliceShow = 2;
    } else if (windowWidth < 1200) {
      $defaultShow = 4;
      $sliceShow = 2;
    } else {
      $defaultShow = 4;
      $sliceShow = 2;
    }
  
    return [$sliceShow, $defaultShow];
  }
  
  function load_more($sectionName = "", $locationCol, $btnParentClass ,$btnId, $defaultShow = 4, $sliceShow = 2) {
    $($locationCol).css("display", "none");
    $($sectionName + " " + $btnParentClass).css("display", "none");
  
    $($locationCol).slice(0, $defaultShow).fadeIn();
    if ($($locationCol + ":hidden").length != 0) {
      $($sectionName + " " + $btnParentClass).css("display", "flex");
  
      $($btnId).off("click").on("click", function (e) {
        e.preventDefault();
  
        $($locationCol + ":hidden").slice(0, $sliceShow).slideDown(500);
        if ($($locationCol + ":hidden").length == 0) {
          $($sectionName + " " + $btnParentClass).css("display", "none");
        }
      });
    }
  }
  
  $(document).ready(function () {
    var sliceDefault, sliceShow;
  
    [sliceShow, sliceDefault] = updateSliceShow();
  
    $(window).on("resize", function () {
      [sliceShow, sliceDefault] = updateSliceShow();
  
      load_more(".d2c_blog_page", ".blog", ".d2c_blog_btn" ,"#d2c_blog_more", sliceDefault, sliceShow);
      load_more(".d2c_blog_page", ".popular", ".d2c_popular_btn" ,"#d2c_popular_more", sliceDefault, sliceShow);
    });
  
    load_more(".d2c_blog_page", ".blog", ".d2c_blog_btn" ,"#d2c_blog_more", sliceDefault, sliceShow);
    load_more(".d2c_blog_page", ".popular", ".d2c_popular_btn" ,"#d2c_popular_more", sliceDefault, sliceShow);
  });



// Template Name: {{Best EntroLaunch Onepage Bootstrap Templates - DesignToCodes}}
// Template URL: {{https://designtocodes.com/product/best-entrolaunch-onepage-bootstrap-templates}}
// Description: {{Get ahead of the competition with EntroLaunch Onepage Bootstrap Template designed specifically for entrepreneurs. Start today!}}
// Author: DesignToCodes
// Author URL: https://www.designtocodes.com
// Text Domain: {{ Entro Launch }}
