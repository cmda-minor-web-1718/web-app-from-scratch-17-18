'use strict';

{ // Use ES6 IIFE
  const sections = {
    toggle: route => {
      console.log('Toggle in sections object fired');
      console.log(route);
      const sections = document.getElementsByClassName('basic-section');
      for (let i = 0; i < sections.length; i++) {
        const sect = sections[i];
        if (sect.id !== route) {
          sect.classList.add('hide');
        } else {
          sect.classList.remove('hide');
        }
      }
    }
  };

  const routes = {
    init: () => {
      console.log('Init in routes object fired');

      window.addEventListener('hashchange', () => {
        const route = location.hash.substring(1);
        sections.toggle(route);
      });
    }
  };

  const app = {
    init: () => {
      console.log('Init in app object fired');
      routes.init();
    }
  };

  app.init();
}
