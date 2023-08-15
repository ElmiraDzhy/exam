import React from 'react';
import Icon from '@mdi/react';
import { mdiPlay, mdiChevronRight } from '@mdi/js';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './HowItWorksPage.module.scss';
import InfoCard from './InfoCard';
import StepCard from './StepCard';
import OutgoingCard from './OutgoingCard';
import StatsCard from './StatsCard';
import PricingCard from './PricingCard';

const faqFirstArticle = [
  {
    id: uuidv4(),
    question: 'How long does it take to start receiving submissions?',
    answer: 'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase .',
  },
  {
    id: uuidv4(),
    question: 'How long do Naming Contests last?',
    answer: 'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
  },
  {
    id: uuidv4(),
    question: 'Where are the creatives located?',
    answer: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.',
  },
  {
    id: uuidv4(),
    question: 'What if I do not like any submissions?',
    answer: [
      'While it is unusually rare that you will not like any names provided, we have a few options in case this problem occurs:',
      'If the contest ends and you have not yet found a name that you’d like to move forward with, we can provide complimentary extension of your contest as well as a complimentary consultation with one of our branding consultants (a $99 value).',
      'By exploring our premium domain marketplace you can apply the contest award towards the purchase of any name listed for sale.',
      'If you choose the Gold package or Platinum package and keep the contest as "Not Guaranteed", you can request a partial refund if you choose not to move forward with any name from you project. (Please note that the refund is for the contest award). Here is a link to our Refund Policy',
    ],
  },
  {
    id: uuidv4(),
    question: 'How much does it cost?',
    answer: 'Our naming competitions start at $299, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our Pricing Page for details',
  },
  {
    id: uuidv4(),
    question: 'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
    answer: 'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our Pricing Page.',
  },
  {
    id: uuidv4(),
    question: 'What if I want to keep my business idea private?',
    answer: 'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.',
  },
  {
    id: uuidv4(),
    question: 'Can you serve customers outside the US?',
    answer: 'Absolutely. Squadhelp services organizations across the globe. Our customer come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We’ve helped more than 25,000 customer around the world.',
  },
  {
    id: uuidv4(),
    question: ' Can I see any examples?',
    answer: [
      'Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.',
      'Name Examples',
      'Tagline Examples',
      'Logo Examples',
    ],
  },
];

const faqSecondArticle = [
  {
    id: uuidv4(),
    question: "What's included with a Domain Purchase?",
    answer: 'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.',
  },
  {
    id: uuidv4(),
    question: 'How does the Domain transfer process work?',
    answer: 'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
  },
  {
    id: uuidv4(),
    question: 'If I purchase a Domain on installments, can I start using it to setup my website?',
    answer: 'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.',
  },
];

const faqThirdArticle = [
  {
    id: uuidv4(),
    question: 'What are Managed Contests?',
    answer: "The 'Managed' option is a fully managed service by Squadhelp Branding experts. It includes a formal brief preparation by Squadhelp team and management of your contest. Managed Contests are a great fit for companies that are looking for an \"Agency\" like experience and they do not want to manage the contest directly.Our branding team has directly managed hundreds of branding projects and has learned several best practices that lead to successful project outcomes. Our team will apply all best practices towards the management of your branding project.Learn more about our Managed Contest Service",
  },
  {
    id: uuidv4(),
    question: "What's a typical timeline for a Managed Contest?",
    answer: [
      'The overall process takes 12-13 days.',
      'The Managed projects start with a project kick-off call with your Branding Consultant. You can schedule this call online immediately after making your payment.',
      'After your kick-off call, the Branding consultant will write your project brief and send for your approval within 1 business day.',
      'Upon your approval, the contest will go live. The branding consultant will help manage your project throughout the brainstorming phase (typically 5 days).',
      'Upon the completion of brainstorming phase, the branding consultant will work with you to test the top 6 names from your Shortlist (3-5 Days). In addition, the branding consultant will coordinate the detailed Trademark screening (1-3 days)'],
  },
  {
    id: uuidv4(),
    question: 'How much do Managed Contests cost?',
    answer: [
      'We offer two levels of Managed Contests. Standard ($1499) and Enterprise ($2999). The Enterprise managed contest includes:',
      '(1) a $500 award amount (instead of $300), which will attract our top Creatives and provide more options to choose from;',
      '(2) we will ensure a senior member of our branding team is assigned to your project and the branding team will invest about 3X more time in the day-to-day management of your project;',
      '(3) you will receive more high-end trademark report and 5X more responses for your audience test.',
      'Here is a link to our Pricing page with a detailed comparison of the two packages.'],
  },
  {
    id: uuidv4(),
    question: 'Where are the Branding Consultants located?',
    answer: 'All our branding consultants are based in in our Headquarters (Hoffman Estates, IL). Our branding consultants have many years of experience in managing hundreds of branding projects for companies ranging from early stage startups to Fortune 500 corporations.',
  },
];

const faqFourthArticle = [
  {
    id: uuidv4(),
    question: 'Can anyone join your platform?',
    answer: 'We are open to anyone to signup. However, we have an extensive "Quality Scoring" process which ensures that high quality creatives have the ability to continue to participate in the platform. On the other hand, we limit the participation from those creatives who do not consistently receive high ratings.',
  },
  {
    id: uuidv4(),
    question: 'Can I start participating immediately upon signing up?',
    answer: 'When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to "Full Access", so that you can begin participating in all open contests.',
  },
  {
    id: uuidv4(),
    question: 'How Do I Get Paid?',
    answer: 'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.',
  },
];

const HowItWorksPage = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.banner}>
          <div className={styles['banner-flex-container']}>
            <p className={styles['soft-btn']}>World&apos;s #1 Naming Platform</p>
            <h1 className={styles['banner-header']}>How Does Squadhelp Work?</h1>
            <p className={styles['section-info']}>Squadhelp helps you come up with a great name for your business by combining the power of crowd sourcing with sophisticated technology and Agency-level validation services.</p>
            <button type="button" className={styles['banner-play-button']}>
              <Icon path={mdiPlay} size={1} />
              Play Video
            </button>
          </div>
          <div>
            <img className={styles['banner-image']} src="staticImages/banner-image.svg" alt="banner" />
          </div>
        </section>

        <section className={styles['cards-section']}>
          <div className={styles['cards-section-flex-container']}>
            <p className={styles['soft-btn']}>Our Services</p>
            <h2 className={styles['cards-section-header']}>3 Ways To Use Squadhelp</h2>
            <p className={styles['section-info']}>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
          </div>
          <div className={styles['cards-container']}>
            <InfoCard imageSrc="staticImages/contest-card-image.svg" header="Launch a Contest" info="Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability." buttonText="Launch a Contest" />
            <InfoCard imageSrc="staticImages/names-for-sale-card-image.svg" header="Explore Names For Sale" info="Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design" buttonText="Explore Names For Sale" />
            <InfoCard imageSrc="staticImages/managed-contests-card-image.svg" header="Agency-level Managed Contests" info="Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs" buttonText="Learn More" />
          </div>
        </section>

        <section className={styles['steps-section']}>
          <img className={styles['icon-steps-section']} src="staticImages/bowl-image.svg" alt="icon steps" />
          <h2 className={styles['steps-section-header']}>How Do Naming Contests Work?</h2>
          <div className={styles['flex-container-steps-section']}>
            <img className={styles['image-steps-section']} src="staticImages/steps-container-image.svg" alt="" />
            <div className={styles['steps-container']}>
              <StepCard stepNumber="1" stepText="Fill out your Naming Brief and begin receiving name ideas in minutes" />
              <StepCard stepNumber="2" stepText="Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback." />
              <StepCard stepNumber="3" stepText="Our team helps you test your favorite names with your target audience. We also assist with Trademark screening." />
              <StepCard stepNumber="4" stepText="Pick a Winner. The winner gets paid for their submission." />
            </div>
          </div>
        </section>

        <section className={styles['faq-section']}>
          <article className={styles['faq-section-links']}>
            <ul className={styles['links-container']}>
              <li><a className={styles['link-faq']} href="#contests">Launching A Contest</a></li>
              <li><a className={styles['link-faq']} href="#marketplace">Buying From Marketplace</a></li>
              <li><a className={styles['link-faq']} href="#managed">Managed Contests</a></li>
              <li><a className={styles['link-faq']} href="#creatives">For Creatives</a></li>
            </ul>
          </article>
          <div className={styles['faq-list-articles-flex-container']}>
            <article id="contests">
              <h3 className={styles['faq-list-header']}>Launching A Contest</h3>
              {
                faqFirstArticle.map(
                  (faq) => {
                    return (
                      <OutgoingCard
                        key={faq.id}
                        id={faq.id}
                        answer={faq.answer}
                        question={faq.question}
                      />
                    );
                  },
                )
              }
            </article>
            <article id="marketplace">
              <h3 className={styles['faq-list-header']}>Buying From Marketplace</h3>
              {
                faqSecondArticle.map(
                  (faq) => {
                    return (
                      <OutgoingCard
                        key={faq.id}
                        id={faq.id}
                        answer={faq.answer}
                        question={faq.question}
                      />
                    );
                  },
                )
              }
            </article>
            <article id="managed">
              <h3 className={styles['faq-list-header']}>Managed Contests</h3>
              {
                faqThirdArticle.map(
                  (faq) => {
                    return (
                      <OutgoingCard
                        key={faq.id}
                        id={faq.id}
                        answer={faq.answer}
                        question={faq.question}
                      />
                    );
                  },
                )
              }
            </article>
            <article id="creatives">
              <h3 className={styles['faq-list-header']}>For Creatives</h3>
              {
                faqFourthArticle.map(
                  (faq) => {
                    return (
                      <OutgoingCard
                        key={faq.id}
                        id={faq.id}
                        answer={faq.answer}
                        question={faq.question}
                      />
                    );
                  },
                )
              }
            </article>

          </div>
        </section>

      </main>

      <section className={styles['cta-section']}>
        <img className={styles['cta-section-img']} src="staticImages/add-article-img.svg" alt="" />
        <img className={styles['cta-section-img']} src="staticImages/add-article-img2.svg" alt="" />
        <h3 className={styles['cta-section-header']}>Ready to get started?</h3>
        <p className={styles['cta-section-info']}>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
        <button className={styles['cta-section-btn']} type="button">Start A Contest</button>
      </section>

      <section className={styles['stats-section']}>
        <article className={styles['stats-container']}>
          <StatsCard iconSrc="staticImages/stars.svg">
            {({ boldStyles, textStyles }) => (
              <p className={textStyles}>
                <span className={boldStyles}>4.9 out of 5 stars</span>
                {' '}
                from 25,000+ customers.
              </p>
            )}
          </StatsCard>
          <StatsCard iconSrc="staticImages/img2-for-stats.webp">
            {({ boldStyles, textStyles }) => (
              <p className={textStyles}>
                {' '}
                Our branding community stands
                <span className={boldStyles}> 200,000+</span>
                {' '}
                strong.
              </p>
            )}
          </StatsCard>
          <StatsCard iconSrc="staticImages/sharing-files.svg">
            {({ boldStyles, textStyles }) => (
              <p className={textStyles}>
                <span className={boldStyles}>140+</span>
                {' '}
                Industries supported across more than
                {' '}
                <span className={boldStyles}>85</span>
                {' '}
                countries – and counting.
              </p>
            )}
          </StatsCard>
        </article>
      </section>

      <section className={styles['pricing-section']}>

        <div className={styles['pricing-container']}>
          <PricingCard>
            {({ headerStyles, textStyles, arrowStyles }) => (
              <>
                <div className={arrowStyles}>
                  <Icon path={mdiChevronRight} size={1} />
                </div>
                <div>
                  <h3 className={headerStyles}>Pay a Fraction of cost vs hiring an agency</h3>
                  <p className={textStyles}>
                    For as low as $199, our naming contests and marketplace allow
                    you to get an amazing brand quickly and affordably.
                  </p>
                </div>
              </>
            )}
          </PricingCard>

          <PricingCard>
            {({ headerStyles, textStyles, arrowStyles }) => (
              <>
                <div className={arrowStyles}>
                  <Icon path={mdiChevronRight} size={1} />
                </div>
                <div>
                  <h3 className={headerStyles}>Satisfaction Guarantee</h3>
                  <p className={textStyles}>
                    Of course! We have policies in place to ensure that
                    you are satisfied with your experience.
                    <button type="button">Learn more</button>
                  </p>
                </div>
              </>
            )}
          </PricingCard>
        </div>

        <div className={styles['info-container']}>
          <h3 className={styles['info-container-header']}>Questions?</h3>
          <p className={styles['info-container-text']}>Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
          <button
            className={styles['info-container-button']}
            type="button"
          >
            Schedule Consultation
          </button>
          <div className={styles['phone-container']}>
            <img src="staticImages/phone_icon.svg" alt="phone-icon" />
            <p>(877) 355-3585</p>
          </div>
          <p className={styles['info-container-text']}>Call us for assistance</p>
        </div>

      </section>

      <section className={styles.clients}>
        <h2 className={styles['clients-header']}>Featured In</h2>

        <div className={styles['clients-icons-container']}>
          <img className={styles['clients-icon']} alt="forbes icon" src="staticImages/forbes.svg" />
          <img className={styles['clients-icon']} alt="TNW icon" src="staticImages/TNW.svg" />
          <img className={styles['clients-icon']} alt="chicago icon" src="staticImages/chicago.svg" />
          <img className={styles['clients-icon']} alt="Mashable icon" src="staticImages/Mashable.svg" />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HowItWorksPage;
