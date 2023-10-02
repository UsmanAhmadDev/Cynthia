
// Loco Motive JS

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".wrapper"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".wrapper", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// Real Time & Date Js

window.addEventListener("load", () => {
  clock();
  function clock() {
    const today = new Date();

    // get time components
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    //make clock a 12-hour time clock
    const hourTime = hour > 12 ? hour - 12 : hour;

    // if (hour === 0) {
    //   hour = 12;
    // }
    //assigning 'am' or 'pm' to indicate time of the day
    const ampm = hour < 12 ? "AM" : "PM";

    // get date components
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();

    //declaring a list of all months in  a year
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    //get current date and time
    const date = monthList[month] + " " + day + ", " + year;
    const time = hourTime + ":" + minute + ":" + second + ampm;

    //combine current date and time
    const dateTime = date + " - " + time;

    //print current date and time to the DOM
    document.getElementById("date-time").innerHTML = dateTime;
    setTimeout(clock, 1000);
  }
});


// Mouse follower cursor code

function cursormove(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
    document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  })
}

cursormove();


// Cursor Skew on Mouse move code

var timeout;

function skew(){
  var xscale = 1;
  var yscale = 1;
  var xprev  = 0;
  var yprev  = 0;

  window.addEventListener("mousemove",function(dets){
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    cursormove(xscale, yscale);

    timeout = setTimeout(function(){
      document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    },100);
  });
}

skew();

// Image hover on mouse move code

document.querySelectorAll(".elem")
.forEach(function(elem){
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function(dets){
    gsap.to(elem.querySelector("img"),{
      opacity: 0
    });
  });
  elem.addEventListener("mousemove", function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    // gsap.utils.clamp(-20, 20, diff)
    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
    });
  });
});

// GSAP Script Code 


gsap.from(".wrapper .banner .heading h2,.wrapper .banner .heading h6",{
  y: 400,
  duration:1,
  opacity:0,
  stagger: .4
})

gsap.from(".wrapper .banner .sub-headings h5",{
  y: -100,
  duration: 1,
  opacity: 0,
  stagger: .4
})

gsap.from(".wrapper .banner .working .work, .wrapper .banner .working .ambass, .wrapper .banner .working .icons",{
  y: 100,
  duration: 1,
  opacity: 0,
  stagger: .4
})