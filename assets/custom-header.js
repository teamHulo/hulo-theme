class CustomHeaderMenu extends HTMLElement {
  constructor() {
    super();
    
  }
  connectedCallback() {
    this.details = this.querySelectorAll("details");
    this.details.forEach((detail) => {
      detail.addEventListener("click", this.eventHandle.bind(this));
    });

    document.body.addEventListener("click", this.handleDocumentClick.bind(this));
  }
  eventHandle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggle(e.currentTarget);
  }
  disconnectedCallback() {
    document.body.removeEventListener("click", this.handleDocumentClick.bind(this));
  }
  handleDocumentClick(e) {
    if (!this.contains(e.target)) {
      this.closeAll(this);
    }
  }
  toggle(detail) {
    detail.hasAttribute("open")
      ? this.close(detail)
      : (this.closeAll(detail.parentNode.closest("details") || this),
        this.open(detail));
  }
  open(element) {
    element.setAttribute("open", "");
    //this.showAnimate();
  }

  showAnimate() {
    this.querySelectorAll('.element-animate').forEach((element) => {
      element.classList.add('show-animate');
    });

  }
  removeAnimate() {
    this.querySelectorAll('.element-animate').forEach((element) => {
      element.classList.remove('show-animate');
    });
  }

  close(element) {
    element.removeAttribute("open");
  }

  closeAll(container) {
    container.querySelectorAll("details").forEach((element) => element.removeAttribute("open"));
  }
}
customElements.define("custom-menu", CustomHeaderMenu);


class customHeaderDrawer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){
    this.buttonOpen = document.querySelector(".burger");
    this.panelsWrap = this.querySelector("secondary-panels");
    this.buttonPanels = this.querySelectorAll("[data-panel]");
    this.panels = this.querySelectorAll('.panel');
    this.buttonClose = this.querySelector("[close-drawer]");
    this.buttonOpen.addEventListener('click', this.open.bind(this));
    this.buttonClose.addEventListener('click', this.close.bind(this));
    this.panelsClose = this.querySelectorAll("[data-close-panel]");
    this.overload = this.querySelector('.overlay');
    this.overload.addEventListener("click", this.close.bind(this));
    this.buttonPanels.forEach(panel => panel.addEventListener("click", this.panelOpen.bind(this, panel)));
    this.panelsClose.forEach(panel => panel.addEventListener("click", this.closeAllPanel.bind(this)));
  }

  open(){
    this.style.display = "block";
    setTimeout(()=> { 
      this.setAttribute("open", ""); 
      this.showAnimate();
    } ,100);
    this.bodyNotScroll();
  }
  bodyNotScroll() {
    console.log('ffff');
    document.body.style.overflow = "hidden";
  }
  bodyScroll() {
    console.log('aaaa');
    document.body.style.overflow = 'visible';
  }
  showAnimate(){
    this.classList.add('show-animate');
  }
  removeAnimate(){
    this.classList.remove('show-animate');
  }
  close(){
    this.removeAttribute("open");
    setTimeout(() => (this.removeAttribute("open"), this.style.display = "none", this.closeAllPanel(), this.removeAnimate()), 500);
    this.bodyScroll();
  }
  closeAllPanel() {
    this.panels.forEach( panel => (panel.setAttribute('hidden',''),this.panelsWrap.removeAttribute('open')));
    this.showAnimate();
  }
  panelOpen(panel) {
    const panelOpen = panel.getAttribute('panel-open');
    this.removeAnimate();
    this.panels.forEach( panel => panel.getAttribute('data-title') == panelOpen ? panel.removeAttribute('hidden') : null);
    this.panelsWrap.setAttribute('open','');
  }


}
customElements.define("custom-header-drawer", customHeaderDrawer);
