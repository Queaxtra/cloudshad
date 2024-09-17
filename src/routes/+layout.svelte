<script>import "../app.css";</script><slot></slot>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

:global(body) {
    font-family: 'Raleway', sans-serif;
}

:global(.background-overlay) {
  position: absolute;
  inset: 0;
  background-color: #ffffff;
  opacity: 0.7;
  background-image: radial-gradient(#000000 0.5px, #ffffff 0.5px);
  background-size: 10px 10px;
  mask-image: linear-gradient(
    to bottom, 
    rgba(0,0,0,0) 0%, 
    rgba(0,0,0,1) 25%, 
    rgba(0,0,0,1) 75%, 
    rgba(0,0,0,0) 100%
  );
}
</style>