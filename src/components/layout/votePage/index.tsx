'use client'
import React from 'react'
import styles from './votePage.module.scss'
import { useState } from 'react'
import { Header } from '../../layout/header';
import { Section, useSection } from '../../ui/section';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import useCandidates from '@/hook/useCandidates';
import { CandidateCard } from './candidateCard';

function VotePage({ useDiD }: { useDiD: boolean }) {

  // const { isConnected, connect, disconnect, trimmed } = useWallet()

  return (
    <main className={styles.main}>

      <HeaderTop />

      <div className={styles.Container}>
        <CoverSection />
        <PoliticsSection />
        <RulesSection />
        <FlowSection />
        <VoteSection useDiD={useDiD} />

      </div>
    </main >
  )
}

const HeaderTop = () => {
  const { currentIndex, scrollToSection } = useSection()
  return <Header navItems={[{
    text: '選舉公報',
    onClick: () => scrollToSection(0)
  }, {
    text: '選舉規範',
    onClick: () => scrollToSection(1)
  }, {
    text: '投票專區',
    onClick: () => scrollToSection(2)
  }, /* {
    text: isConnected ? trimmed : '連結錢包',
    className: styles.connectWallet,
    onClick: () => isConnected ? disconnect() : connect()
  }*/
  ]}
    currentIndex={currentIndex} />
}

const CoverSection = () => <img className={styles.cover} src='./images/RXCA5-04.png'></img>

const PoliticsSection = () => {
  const [politicsCollapsed, setpoliticsCollapsed] = useState(true)
  return <Section id='politics'>
    <h2>數位社會民意代表候選人選舉公報</h2>
    <div className={styles.politics + ' ' + (politicsCollapsed ? styles.politicsCollapsed : '')}>
      <div className={styles.politicsTable}>
        <div className={styles.politicsSidebar} >
          <img src='./images/politics/sidebar.png'></img>
          {politicsCollapsed && <div className={styles.politicsCollapsedOverlaySidebar} onClick={() => setpoliticsCollapsed(false)} />}
        </div>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          breakpoints={{
            480: {
              slidesPerView: 1
            },
            769: {
              slidesPerView: 4
            },
            1024: {
              slidesPerView: 4
            },
          }}
          className={styles.swiper}
        >
          <SwiperSlide>
            <img className={styles.politicTable} src='./images/politics/1.png'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img className={styles.politicTable} src='./images/politics/2.png'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img className={styles.politicTable} src='./images/politics/3.png'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img className={styles.politicTable} src='./images/politics/4.png'></img>
          </SwiperSlide>
        </Swiper>
      </div>
      {politicsCollapsed && <div className={styles.politicsCollapsedOverlay} onClick={() => setpoliticsCollapsed(false)}>更多資訊</div>}
    </div>
  </Section>
}

const RulesSection = () => <Section id='rules'>
  <h2>選舉規範</h2>
  <div className={styles.rules}>
    <div className={styles.rule}>
      <p>候選人資格</p>
      <ul>
        <li>必須申請Taiwan DID</li>
        <li>政見需與web3社會基礎建設發展相關。</li>
      </ul>
    </div>
    <div className={styles.rule}>
      <p>投票人資格</p>
      <ul>
        <li>已申請Taiwan DID者,方有投票權和資格。</li>
      </ul>
    </div>
  </div>
</Section>

const FlowSection = () => <Section id='flow'>
  <h2>投票流程</h2>
  <div className={styles.steps}>
    <div className={styles.step}>
      <img className={styles.stepImage} src='/images/steps/1.png' alt='step1' />
      <p className={styles.date}>2023/11/10</p>
      <p>公佈選舉規範</p>
    </div>
    <img className={styles.arrow} src='/images/steps/arrow.png' alt='>' />
    <div className={styles.step}>
      <img className={styles.stepImage} src='/images/steps/2.png' alt='step1' />
      <p className={styles.date}>2023/11/15</p>
      <p>候選人發表政見</p>
    </div>
    <img className={styles.arrow} src='/images/steps/arrow.png' alt='>' />
    <div className={styles.step}>
      <img className={styles.stepImage} src='/images/steps/3.png' alt='step1' />
      <p className={styles.date}>2023/12/01~17</p>
      <p>認證DID並進行投票</p>
      <small>網站和現場皆可投票</small>
    </div>
    <img className={styles.arrow} src='/images/steps/arrow.png' alt='>' />
    <div className={styles.step}>
      <img className={styles.stepImage} src='/images/steps/4.png' alt='step1' />
      <p className={styles.date}>2023/12/17</p>
      <p>DAO Taipei開票</p>
    </div>
  </div>
</Section>

const VoteSection = ({ useDiD = false }: { useDiD: boolean }) => {
  const candidates = useCandidates({ useDiD })

  return <Section id='votes'>
    <h2>投票專區</h2>
    <div className={styles.candidates}>
      {candidates.map((candidate, index) => <CandidateCard key={index} candidate={candidate} useDiD={useDiD} />)}
    </div>
  </Section>
}


export default VotePage