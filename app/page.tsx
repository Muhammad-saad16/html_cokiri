import Image from "@/components/Img";
import FilterLink from "@/components/FilterLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Shop from "@/components/Shop";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { imgSrc } from "@/lib/site";

const CATEGORY_TILES = [
  { filter: "jewellery", title: "Jewellery", kicker: "Elegance That Shines", cta: "Explore Jewellery", image: "1573408301185-9146fe634ad0", alt: "Crystal bracelet" },
  { filter: "handbags", title: "Handbags", kicker: "Carry Your Style", cta: "Shop Handbags", image: "1584917865442-de89df76afd3", alt: "Red top-handle handbag" },
  { filter: "perfumes", title: "Perfumes", kicker: "Elegance in Every Drop", cta: "Discover Perfumes", image: "1615634260167-c8cdede054de", alt: "Perfume bottles" },
  { filter: "watches", title: "Watches", kicker: "Time, Styled Beautifully", cta: "Shop Watches", image: "1522312346375-d1a52e2b99b3", alt: "Rose gold watch" },
];

const FOCUS = [
  ["Quality", "Delivering products with a premium look and feel."],
  ["Style", "Bringing modern and trending designs to our customers."],
  ["Choice", "Jewellery, handbags, perfumes, and watches in one destination."],
  ["Convenience", "Making shopping simple through our online platform."],
  ["Trust", "Building lasting relationships through reliable service."],
];

const WHY = [
  ["Premium Quality", "We focus on products that deliver a sophisticated and premium experience."],
  ["Elegant Style", "Collections selected for women who appreciate timeless elegance and modern fashion."],
  ["Trending Collections", "We continuously introduce contemporary styles inspired by today's fashion trends."],
  ["Women's Lifestyle", "Jewellery, handbags, perfumes, and watches — everything you need to complete your look."],
  ["Online Convenience", "Shop from anywhere, anytime, without leaving your home."],
  ["Door-to-Door Delivery", "Convenient delivery service across Pakistan and Bahrain."],
];

const JOURNEY = [
  ["2012", "Kangan Begins", "Kangan starts its journey in the fashion and lifestyle industry."],
  ["Growing", "Bahrain & Pakistan", "Expanding our presence and serving customers across two markets."],
  ["Today", "Online Fashion & Lifestyle", "Jewellery, handbags, perfumes, and watches through a convenient online shopping experience."],
  ["Tomorrow", "Beyond Borders", "Our vision continues to grow toward new markets and new opportunities."],
];

const FAQ = [
  ["How do I place an order?", "Tap any product, fill in your name, phone number and delivery address, then press Confirm Order. Our team receives your order instantly and will contact you to confirm it."],
  ["Do I need to pay online?", "No. There is no online payment on our website. After you place your order, we will call or WhatsApp you to confirm the price, payment method and delivery details."],
  ["Where do you deliver?", "We offer door-to-door delivery across Pakistan and Bahrain."],
  ["How can I track my order?", "Every order gets an order number. Message us on WhatsApp with your order number and we will update you on its status."],
  ["Returns & exchange", "If you have any issue with your order, please contact our support team on WhatsApp and we will be happy to help."],
];

export default function Home() {
  return (
    <>
      <div className="announce">
        <p>Door-to-door delivery across Pakistan &amp; Bahrain &nbsp;·&nbsp; Serving you since 2012</p>
      </div>

      <Header />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero__media">
            <Image src={imgSrc("1601121141461-9d6647bca1ed")} alt="Gold kundan necklace and earrings set" fill priority sizes="100vw" />
          </div>
          <div className="container hero__content">
            <p className="eyebrow">Since 2012 &nbsp;|&nbsp; Bahrain &amp; Pakistan</p>
            <h1>
              Discover Your Style.
              <br />
              <em>Express Your Elegance.</em>
            </h1>
            <p className="hero__text">
              Kangan is a premium online fashion and lifestyle brand for women, bringing together elegant jewellery,
              trending handbags, beautiful perfumes, and premium watches.
            </p>
            <div className="hero__actions">
              <FilterLink filter="all" className="btn btn--gold">Shop Now</FilterLink>
              <a href="#about" className="btn btn--ghost">Our Story</a>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="strip">
          <div className="container strip__inner">
            <div><strong>Premium Quality</strong><span>Carefully selected pieces</span></div>
            <div><strong>Door-to-Door</strong><span>Pakistan &amp; Bahrain</span></div>
            <div><strong>Easy Ordering</strong><span>We confirm every order personally</span></div>
            <div><strong>Since 2012</strong><span>Trusted by our customers</span></div>
          </div>
        </section>

        {/* Categories */}
        <section className="section" id="collection">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Our Collection</p>
              <h2>Everything to complete your look</h2>
            </div>
            <div className="cats">
              {CATEGORY_TILES.map((c) => (
                <FilterLink key={c.filter} filter={c.filter} className="cat">
                  <Image src={imgSrc(c.image)} alt={c.alt} fill sizes="(max-width: 1024px) 50vw, 300px" />
                  <div className="cat__body">
                    <p className="cat__kicker">{c.kicker}</p>
                    <h3>{c.title}</h3>
                    <span>{c.cta} →</span>
                  </div>
                </FilterLink>
              ))}
            </div>
          </div>
        </section>

        {/* Shop */}
        <section className="section section--tint" id="shop">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Shop From Home</p>
              <h2>Your favourite style, delivered to your door</h2>
              <p className="section__lead">
                Tap any product to place your order. No online payment needed — our team will contact you to confirm
                your order and delivery details.
              </p>
            </div>
            <Shop />
            <ol className="steps">
              <li><span>01</span><strong>Discover</strong>Browse the collection</li>
              <li><span>02</span><strong>Select</strong>Tap your favourite piece</li>
              <li><span>03</span><strong>Order</strong>Fill in your details &amp; confirm</li>
              <li><span>04</span><strong>Enjoy</strong>We call you &amp; deliver to your door</li>
            </ol>
          </div>
        </section>

        {/* About */}
        <section className="section" id="about">
          <div className="container split">
            <div className="split__media">
              <div className="frame">
                <Image src={imgSrc("1596944924616-7b38e7cfac36")} alt="Hands wearing delicate gold jewellery" fill sizes="(max-width: 860px) 100vw, 560px" />
              </div>
              <div className="badge-year"><strong>2012</strong><span>Est.</span></div>
            </div>
            <div className="split__text">
              <p className="eyebrow">About Kangan</p>
              <h2>Where Elegance Meets Lifestyle</h2>
              <p>Kangan is an online fashion and lifestyle company established in 2012, serving customers in Bahrain and Pakistan.</p>
              <p>
                We believe every woman deserves to express her personality through fashion, beauty, and elegance.
                That&apos;s why we bring together carefully selected products designed for the modern woman who values
                quality, style, sophistication, and individuality.
              </p>
              <p>
                From sparkling jewellery and trending handbags to signature perfumes and elegant watches, Kangan offers a
                complete lifestyle collection — all from one destination.
              </p>
              <ul className="pills">
                <li>American Diamond</li>
                <li>Zircon Stones</li>
                <li>Kundan Designs</li>
                <li>18K Gold-Plated</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="section section--dark">
          <div className="container mv">
            <div className="mv__col">
              <p className="eyebrow">Our Mission</p>
              <h2>Making Everyday Elegance Accessible</h2>
              <p>
                Our mission is to make premium fashion and lifestyle products accessible to women through a convenient
                and reliable online shopping experience.
              </p>
              <dl className="focus">
                {FOCUS.map(([t, d]) => (
                  <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
                ))}
              </dl>
            </div>
            <div className="mv__col">
              <p className="eyebrow">Our Vision</p>
              <h2>A Lifestyle Brand for the Modern Woman</h2>
              <p>
                Our vision is to build Kangan into a trusted and recognized online fashion and lifestyle brand for women,
                known for elegance, quality, innovation, and customer satisfaction.
              </p>
              <p>
                We aim to continue expanding across Pakistan, Bahrain, and international markets, bringing new trends and
                premium lifestyle products to women everywhere.
              </p>
              <p className="quote">Kangan — Your Style. Your Passion. Your Lifestyle.</p>
            </div>
          </div>
        </section>

        {/* Why Kangan */}
        <section className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Why Kangan?</p>
              <h2>Where fashion meets elegance</h2>
            </div>
            <div className="why">
              {WHY.map(([t, d], i) => (
                <article key={t}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section section--tint">
          <div className="container split split--reverse">
            <div className="split__media">
              <div className="frame">
                <Image src={imgSrc("1611085583191-a3b181a88401")} alt="Woman wearing a delicate pendant" fill sizes="(max-width: 860px) 100vw, 560px" />
              </div>
            </div>
            <div className="split__text">
              <p className="eyebrow">The Kangan Experience</p>
              <h2>More Than Fashion — It&apos;s Your Lifestyle</h2>
              <p>At Kangan, we want every product to become part of your personal style.</p>
              <ul className="lines">
                <li>A necklace that completes your look.</li>
                <li>A handbag that defines your outfit.</li>
                <li>A perfume that becomes your signature.</li>
                <li>A watch that adds elegance to your wrist.</li>
              </ul>
              <p>Kangan is created for every woman who wants to look beautiful, feel confident, and express her unique style.</p>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Our Journey</p>
              <h2>From 2012 to beyond borders</h2>
            </div>
            <ol className="timeline">
              {JOURNEY.map(([when, t, d]) => (
                <li key={when}>
                  <span>{when}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Promise + FAQ */}
        <section className="section section--tint" id="support">
          <div className="container split split--top">
            <div className="split__text">
              <p className="eyebrow">Customer Promise</p>
              <h2>Your Satisfaction Matters</h2>
              <p>
                We believe great products should come with great service. From discovering your favourite product to
                receiving it at your doorstep, we aim to make every interaction with Kangan simple, elegant, and reliable.
              </p>
              <p className="quote quote--dark">
                Your trust inspires us. Your style inspires us. Your satisfaction is our priority.
              </p>
            </div>
            <div className="faq" id="faq">
              {FAQ.map(([q, a], i) => (
                <details key={q} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="container cta__inner">
            <p className="eyebrow">Ready to Elevate Your Lifestyle?</p>
            <h2>It&apos;s time to discover Kangan.</h2>
            <p>
              Discover jewellery that shines. Carry handbags that express your style.
              <br />
              Find a fragrance that becomes your signature. Wear a watch that defines your elegance.
            </p>
            <FilterLink filter="all" className="btn btn--gold">Shop the Collection</FilterLink>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
