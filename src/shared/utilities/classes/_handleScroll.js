// @flow

class HandleScroll {
  state: Object;

  constructor(props: Object) {
    if (
      typeof props.scrollBreak === 'undefined' ||
      typeof props.scrollBreak === 'undefined'
    ) {
      throw new Error('Constructor parameters incorrect');
    }
    this.state = {
      scrollBreak: props.scrollBreak,
      element: props.element
    };
  }

  getElement() {
    const elementRecieved: any = document.querySelector(this.state.element);
    return elementRecieved;
  }

  onScroll() {
    if (window.pageYOffset < this.state.scrollBreak) {
      const el = this.getElement();
      el.style.webkitTransform = 'translateY(-100%)';
      el.style.mozTransform = 'translateY(-100%)';
      el.style.msTransform = 'translateY(-100%)';
      el.style.oTransform = 'translateY(-100%)';
      el.style.transform = 'translateY(-100%)';
      setTimeout(
        () => {
          el.style.display = 'none';
        },
        500
      );
    }
  }

  onScrollInterval() {
    if (window.pageYOffset >= this.state.scrollBreak) {
      const el = this.getElement();
      el.style.display = 'initial';
      setTimeout(() => {
        el.style.webkitTransform = 'translateY(0)';
        el.style.mozTransform = 'translateY(0)';
        el.style.msTransform = 'translateY(0)';
        el.style.oTransform = 'translateY(0)';
        el.style.transform = 'translateY(0)';
      });
    }
  }
}

export default HandleScroll;
