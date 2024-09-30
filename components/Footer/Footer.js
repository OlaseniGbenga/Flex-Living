export class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      
       <footer>
      <section>
        <img
          class="logo"
          src="/media/images/logo.png"
          alt="Flex living logo"
        />
        <div>
          <p>Contact number: 02033074477</p>
          <div>
            <ul class="socail" style="padding: 0">
              <li>
                <a href="#"
                  ><img src="/media/svg/facebook.svg" alt="facebook logo"
                /></a>
              </li>
              <li>
                <a href="#"
                  ><img src="/media/svg/linkedIn.svg" alt="linkedInogo"
                /></a>
              </li>
              <li>
                <a href="#"><img src="/media/svg/x.svg" alt="x logo" /></a>
              </li>
            </ul>
            <p>© 2021 Flex Living</p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <p>Company</p>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Our team</li>
          </ul>
        </div>
        <div>
          <p>Guests</p>
          <ul>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <p>Privacy</p>

          <ul>
            <li>Terms of service</li>
            <li>Private Policy</li>
          </ul>
        </div>
      </section>
      <section>
        <div>
          <p>Stay up to date</p>
          <p>Be the first to know about our newest apartments</p>
        </div>

        <input type="email" placeholder="example@email.com" />
        <button>Subscribe</button>
      </section>
    </footer>`;
  }
}
