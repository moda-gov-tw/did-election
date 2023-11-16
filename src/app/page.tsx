'use client'
import Image from 'next/image'
import styles from './page.module.scss'
import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Section, useSection } from '@/components/ui/section';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const Card = ({ children }: { children: any }) => (
  <div className={styles.Card}>{children}</div>
);

interface Candidate {
  potrait: string;
  name: string;
  birthday: string;
  gender: string;
  dao: string;
  voteCount?: number;
}

const candidates: Candidate[] = [{
  potrait: '/images/candidates/1.png',
  name: '笑鼠',
  birthday: '2022.2.10',
  gender: '未知',
  dao: 'FAB DAO'
}, {
  name: 'DAO疤貓',
  potrait: '/images/candidates/2.png',
  birthday: '2022/10/21',
  gender: '流動性別',
  dao: 'da0 零時道'
},
{
  potrait: '/images/candidates/3.png',
  name: '章笑顏',
  birthday: '2021/10/09',
  gender: '不跟你說',
  dao: 'Volume DAO 眾聲道'
}, {
  potrait: '/images/candidates/4.png',
  name: 'RICE',
  birthday: '時候未DAO',
  gender: '聞聞味DAO才知DAO',
  dao: '不知DAO'
}]

const CandidateCard = ({ candidate, index }: { candidate: Candidate, index: number }) =>
  <Card>
    <div className={styles.CandidateCard}>
      <Button onClick={console.log('ok')} text='投票給我' variant="primary" disabled={true} />
      <hr />
      <div className={styles.index}>{index + 1}</div>
      <hr />
      <div className={styles.media}>
        <img src={candidate.potrait} alt={candidate.name} />
      </div>
      <hr />
      <div className={styles.name}>{candidate.name}</div>
      <hr />
      <div className={styles.dao}>{candidate.dao}</div>
      {candidate.voteCount !== undefined && <div className={styles.vote}>
        {candidate.voteCount}票
      </div>}
    </div>
  </Card>

export default function Home() {
  const { currentIndex, scrollToSection } = useSection()
  const [politicsCollapsed, setpoliticsCollapsed] = useState(true)
  return (
    <main className={styles.main}>

      <Header navItems={[{
        text: '選舉公報',
        onClick: () => scrollToSection(0)
      }, {
        text: '選舉規範',
        onClick: () => scrollToSection(1)
      }, {
        text: '投票專區',
        onClick: () => scrollToSection(2)
      }, {
        text: '連結錢包',
        className: styles.connectWallet,
        disabled: true,
        onClick: () => console.log('ok')
      }
      ]}
        currentIndex={currentIndex} />


      <div className={styles.Container}>

        <img className={styles.cover} src='./images/RXCA5-04.png'></img>

        <Section id='politics'>
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
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}>
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

        <Section id='rules'>
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

        <Section id='flow'>
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

        <Section id='votes'>
          <h2>投票專區</h2>
          <div className={styles.candidates}>
            {candidates.map((candidate, index) => <CandidateCard index={index} key={index} candidate={candidate} />)}
          </div>
        </Section>
      </div>
    </main >
  )
}
