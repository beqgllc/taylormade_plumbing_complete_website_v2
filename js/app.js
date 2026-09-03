
const shouldShowLoader = !sessionStorage.getItem("taylorMadeLoaderShown");
if (shouldShowLoader) {
  document.documentElement.classList.add("is-loading");
  sessionStorage.setItem("taylorMadeLoaderShown", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  const serviceContent = {
    "water-heaters.html": {
      label: "Water Heater Service",
      title: "RELIABLE HOT WATER, CLEAR OPTIONS",
      copy: "We help identify whether repair, replacement, or installation support makes the most sense for your home and your situation.",
      points: ["Repair and replacement support", "Clear options before work begins", "Careful preparation and clean completion"],
      placeholder: "Water heater service",
      image: "assets/water heater.webp"
    },
    "fixtures.html": {
      label: "Fixture Service",
      title: "THE DETAILS MATTER",
      copy: "From a stubborn faucet to a fixture replacement, we work carefully around finished surfaces and explain the best path forward.",
      points: ["Faucets, sinks, toilets, and showers", "Repair and replacement guidance", "Respectful work in finished spaces"],
      placeholder: "Fixture service",
      image: "assets/fixtures.webp"
    },
    "repiping.html": {
      label: "Re-Piping Service",
      title: "A BETTER PLAN FOR AGING PIPING",
      copy: "Re-piping is a major home decision. We help clarify the condition, scope, and practical options before the work begins.",
      points: ["Water and drain re-piping support", "Thoughtful project planning", "Thorough, clean installation"],
      placeholder: "Re-piping work",
      image: "assets/repiping.webp"
    },
    "gas-lines.html": {
      label: "Gas-Line Service",
      title: "CAREFUL WORK AROUND CRITICAL SYSTEMS",
      copy: "Gas-line work demands a measured approach. We discuss the scope clearly and work within applicable requirements.",
      points: ["Residential gas-line plumbing support", "Clear scope and next steps", "Professional, detail-focused service"],
      placeholder: "Gas-line service",
      image: "assets/gas line.webp"
    },
    "drain-services.html": {
      label: "Drain Service",
      title: "FIND THE BLOCKAGE, FIX THE PROBLEM",
      copy: "We start with the symptoms and the situation, then explain the appropriate next step for your home.",
      points: ["Drain troubleshooting and clearing", "Practical diagnosis before recommendations", "Clean, respectful service"],
      placeholder: "Drain service",
      image: "assets/drain service.webp"
    },
    "remodels.html": {
      label: "Remodel Plumbing",
      title: "DETAILS THAT FIT THE BIGGER PICTURE",
      copy: "Remodel plumbing works best when the plumbing plan and the construction plan stay in communication from start to finish.",
      points: ["Kitchen and bathroom remodel support", "Coordination around project schedules", "Clean, thorough handoff"],
      placeholder: "Remodel plumbing",
      image: "assets/remodel.webp"
    }
  };
  const servicePage = serviceContent[location.pathname.split("/").pop()];
  const pageHero = document.querySelector(".page-hero");
  if (servicePage && pageHero) {
    document.body.classList.add("service-page");
    document.title = `${servicePage.label} | TaylorMade Plumbing | St. Petersburg FL`;
    const heroEyebrow = pageHero.querySelector(".eyebrow");
    const heroTitle = pageHero.querySelector("h1");
    const heroCopy = pageHero.querySelector("p");
    if (heroEyebrow) heroEyebrow.textContent = servicePage.label;
    if (heroTitle) heroTitle.innerHTML = `${servicePage.placeholder.toUpperCase()}<br><span style="color:#0AA9F5">DONE RIGHT.</span>`;
    if (heroCopy) heroCopy.textContent = servicePage.copy;
    const points = servicePage.points.map(point => `<li>${point}</li>`).join("");
    const catalogSection = pageHero.nextElementSibling;
    if (catalogSection?.classList.contains("section")) catalogSection.classList.add("service-catalog");
    pageHero.insertAdjacentHTML("afterend", `<section class="section service-focus"><div class="container service-focus-grid"><div><div class="eyebrow">${servicePage.label}</div><h2>${servicePage.title}</h2><p>${servicePage.copy}</p><ul>${points}</ul><a class="btn btn-primary" href="schedule.html">REQUEST SERVICE</a></div><figure class="service-media"><img src="${servicePage.image}" alt="${servicePage.placeholder} project" loading="eager"><figcaption>${servicePage.placeholder}</figcaption></figure></div></section>`);
  }

  const existingFooter = document.querySelector("footer.footer");
  if (existingFooter) {
    fetch("footer.html")
      .then(response => response.ok ? response.text() : Promise.reject(new Error("Footer unavailable")))
      .then(markup => {
        existingFooter.outerHTML = markup;
        const year = document.querySelector("[data-footer-year]");
        if (year) year.textContent = new Date().getFullYear();
      })
      .catch(() => {});
  }

  const pageLoader = document.querySelector(".page-loader");
  const showLoader = () => {
    document.body.classList.add("is-loading");
    if (!pageLoader) {
      const loader = document.createElement("div");
      loader.className = "page-loader";
      loader.innerHTML = `
        <div class="brand-splash" aria-live="polite">
          <img class="brand-monogram" src="assets/monogram.webp" alt="TaylorMade Plumbing" />
          <div class="brand-name-shell" aria-label="TaylorMade Plumbing">
            <span class="brand-name-text">TAYLORMAD</span><span class="brand-name-e">E</span>
            <span class="splash-ripple"></span>
            <span class="splash-ripple"></span>
            <span class="splash-ripple"></span>
          </div>
        </div>
      `;
      document.body.appendChild(loader);
    }
  };

  const hideLoader = () => {
    const loader = document.querySelector(".page-loader");
    if (loader) {
      loader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
      document.documentElement.classList.remove("is-loading");
      window.setTimeout(() => loader.remove(), 700);
    } else {
      document.body.classList.remove("is-loading");
      document.documentElement.classList.remove("is-loading");
    }
  };

  const loaderDelay = 1850;

  if (shouldShowLoader) {
    showLoader();
    window.addEventListener("load", () => {
      window.setTimeout(hideLoader, loaderDelay);
    });
  } else {
    document.body.classList.remove("is-loading");
    document.documentElement.classList.remove("is-loading");
  }

  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      mobileMenu.style.setProperty("transform", isOpen ? "translateX(0)" : "", "important");
      mobileMenu.style.setProperty("visibility", isOpen ? "visible" : "", "important");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    mobileMenu.style.removeProperty("transform");
    mobileMenu.style.removeProperty("visibility");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }));

  // Mark the current nav item.
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // Front-end-only form handling. Replace with a real endpoint in production.
  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const msg = form.querySelector(".form-message");
      if (msg) {
        msg.textContent = "Request received. Thank you — TaylorMade Plumbing will contact you using the details provided.";
        msg.classList.add("show");
      }
      form.reset();
    });
  });

  // Smooth in-page links where applicable.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });

  // Reviews
  const reviews = [
    {
      name: "Chris Kirk",
      photo: "assets/reviews/chris-kirk.webp",
      rating: 5,
      text: "Outstanding service! I recently used TaylorMade Plumbing for leak detection and repair and replacement of a few old faucets. All work was completed efficiently and in a very clean manner (even same-day service for the leak). Throughout the process Michael was responsive and communicated very effectively. It's obvious he's extremely skilled and is a true professional. Highly recommended - you don't need to call anyone else."
    },
    {
      name: "Brittany Sawhill",
      photo: "assets/reviews/brittany-sawhill.webp",
      rating: 5,
      text: "Highly recommend. Michael is polite and professional. I recently had a leak which resulted in my tub drain and parts of my main water shut off needing to be replaced. I am very happy with the work he did and would gladly use him for any future plumbing needs. Another company who I will no longer use diagnosed the issue the same day as Michael but they were rude to my guests and said the issue needed to be addressed immediately. Michael was nice and explained the issue could wait until I was in town as long as no one used the tub. I’m glad I waited and got the work done by him. He is honest and reliable."
    },
    {
      name: "Nerissa Bonon",
      photo: "assets/reviews/nerissa-bonon.webp",
      rating: 5,
      text: "Michael and Joey did such a a great job. My water heater started leaking. Went on google and found him. I called and he was very quick to respond. Very professional in explaining what caused the issue. Came back the next day with his partner Joey and completed the job. They left my garage nice and clean. He was also very good at following up with regards to permit and inspection. It was an excellent experience with this company and definitely will call them again of any issues with my home plumbing. Thank you TaylorMade!!!"
    },
    {
      name: "Katie Cooper",
      photo: "assets/reviews/katie-cooper.webp",
      rating: 5,
      text: "We were recommended Michael from a friend and had an excellent experience. Our hot water heater went out and when I reached out, he replied within 30minutes and was able to explain all my options with prices up front. He came out the next day and replaced our hot water heater. Kind, professional, and efficient."
    },
    {
      name: "Greg Tucker",
      photo: "assets/reviews/greg-tucker.webp",
      rating: 5,
      text: "I have used TaylorMade Plumbing for several jobs now and I highly recommend them for your plumbing needs! I cannot say enough good things about their promptness, professionalism and workmanship. Michael and his team replaced a leaking shut off valve suppling water to my home, they replaced my old out dated hot water tank with a tankless hot water heater and when I ran into an issue with some old plumbing during a remodel they were there to fix the issues and keep my remodeling project on schedule!"
    },
    {
      name: "Hunter Deese",
      photo: "assets/reviews/hunter-deese.webp",
      rating: 5,
      text: "So, for starters. I typically choose small businesses when I need work done. Which sometimes backfires. After multiple different plumbing companies either not knowing the issue, or wanting to charge an arm and a leg, I was referred by a colleague to call Michael with TaylorMade Plumbing. For one, he’s actually licensed. Not the fly-by-night type of company. Two, just from the initial phone call, he had a few ideas of what the problem may be. Of course, he was spot on. From start to finish, the entire process has been a dream.Fantastic communication, honest, punctual, and more than fair on pricing. The guy knows his stuff. Highly recommend, couldn’t say enough good things about Michael and TaylorMade Plumbing."
    },
    {
      name: "Grant Kasnick",
      photo: "assets/reviews/grant-kasnick.webp",
      rating: 5,
      text: "I called this company in need of a new plumber due to my current one not quite reliable. I spoke to Micheal and he was really professional and polite and was able to make it out to my house to look at my water heater that was actively leaking. I was stressed thinking that my house was about to flood. Micheal came out and was able to get the heater to replace the heater and put my nerves at ease. Right when he showed up he got right to looking at the heater and informed me what was going on. He did an amazing job easy to say this will be my go to company. Thank you again Micheal for all your help."
    }
  ];

  /* ==========================================
   TAYLORMADE PLUMBING REVIEWS CAROUSEL
  ========================================== */

  const reviewContainer = document.querySelector(".reviews-container");

  if (reviewContainer && reviews.length) {
    const reviewTrack = reviewContainer.querySelector(".reviews-track");
    const dotsContainer = reviewContainer.querySelector(".reviews-dots");
    const prevButton = reviewContainer.querySelector(".reviews-prev");
    const nextButton = reviewContainer.querySelector(".reviews-next");

    let currentIndex = 0;
    let autoPlay;

    function getStars(rating) {
      return "★".repeat(rating);
    }

    function getInitials(name) {
      return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }

    function renderReviews() {
      reviewTrack.innerHTML = "";

      reviews.forEach((review, index) => {
        const slide = document.createElement("article");
        slide.className = "review-slide";
        slide.dataset.index = index;

        const photoHTML = review.photo
          ? `
              <img src="${review.photo}" alt="${review.name}" class="reviewer-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
              <div class="reviewer-photo reviewer-initials" style="display:none;">${getInitials(review.name)}</div>
            `
          : `<div class="reviewer-photo reviewer-initials">${getInitials(review.name)}</div>`;

        slide.innerHTML = `
          <div class="review-card">
            <div class="review-header">
              <div class="reviewer">
                ${photoHTML}
                <div class="reviewer-info">
                  <h3>${review.name}</h3>
                  <div class="review-source">
                    <span class="google-badge" aria-label="Google review">
                      <img src="assets/reviews/google-badge.svg" alt="Google" width="18" height="18">
                    </span>
                    <span>Google Review</span>
                  </div>
                </div>
              </div>
              <div class="review-rating">${getStars(review.rating)}</div>
            </div>
            <div class="review-body">
              <p>${review.text}</p>
            </div>
          </div>
        `;

        reviewTrack.appendChild(slide);
      });
    }

    function renderDots() {
      dotsContainer.innerHTML = "";

      reviews.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "review-dot";
        dot.setAttribute("aria-label", `Show review ${index + 1}`);
        dot.addEventListener("click", function () {
          currentIndex = index;
          showReview(currentIndex);
          restartAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function showReview(index) {
      const slides = reviewTrack.querySelectorAll(".review-slide");
      const dots = dotsContainer.querySelectorAll(".review-dot");

      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function nextReview() {
      currentIndex = (currentIndex + 1) % reviews.length;
      showReview(currentIndex);
    }

    function previousReview() {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      showReview(currentIndex);
    }

    function startAutoPlay() {
      autoPlay = setInterval(nextReview, 4800);
    }

    function stopAutoPlay() {
      clearInterval(autoPlay);
    }

    function restartAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        previousReview();
        restartAutoPlay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        nextReview();
        restartAutoPlay();
      });
    }

    reviewContainer.addEventListener("mouseenter", stopAutoPlay);
    reviewContainer.addEventListener("mouseleave", startAutoPlay);

    renderReviews();
    renderDots();
    showReview(currentIndex);
    startAutoPlay();
  }
});
