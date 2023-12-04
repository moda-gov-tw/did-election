import styles from './votePage.module.scss'
import { Candidate } from '@/hook/useCandidates';
import { Dialog, useDialog } from '@/components/ui/dialog'
import { Button } from '../../ui/button';
import { Fragment } from 'react';
import useWallet from '@/hook/useWallet';
import electedImage from './img/elected.png'

const Card = ({ children }: { children: any }) =>
    <div className={styles.Card}>{children}</div>

const MultiLine = ({ text }: { text: string }) => <>{text.split('\n').map((l, i) => <Fragment key={i}>{l}<br /></Fragment>)}</>

export const CandidateCard = ({ useDiD, candidate }: { useDiD: boolean, candidate: Candidate }) => {
    const { index, potrait, name, dao, voteCount, handleVote: vote, elected } = candidate
    const { connect, disconnect } = useWallet()
    const voteDialog = useDialog()

    const confirmDialog = {
        title: `確認投票將票投給 ${name} ?`,
        children: <>票一但投出將無法取消。</>,
        actions: [{
            text: '取消',
            onClick: () => voteDialog.close()
        }, {
            text: '確定',
            onClick: handleVote
        }]
    }

    async function handleVote() {
        voteDialog.close()
        if (vote) {
            if (useDiD) {
                const connected = await connect()
                    .catch(errorHandler)
            }

            vote()
                ?.then(successHandler)
                .catch(errorHandler)
        }
    }

    async function successHandler() {
        voteDialog.open(successDialog)
        await disconnect()
    }

    async function errorHandler(e: Error) {

        await disconnect()


        if (e.message.startsWith('Connector not found'))
            return voteDialog.open({
                ...errorDialog,
                children: '請檢查是否安裝錢包，然後再試一次'
            })

        if (e.message.startsWith('User rejected the request'))
            return voteDialog.open({
                ...errorDialog,
                children: '拒絕簽署，投票取消。'
            })

        if (e.message === 'already voted')
            return voteDialog.open({
                ...errorDialog,
                children: '您已經投過票了'
            })

        if (e.message.startsWith('The identity is not part of the group') || e.message.startsWith('not in group'))
            return voteDialog.open({
                ...errorDialog,
                children: <>
                    請先使用你的錢包申請台灣DiD<br />
                    <a target="_blank" href={process.env.NEXT_PUBLIC_TW_DID_API}>申請台灣DiD</a>
                </>
            })

        return voteDialog.open(errorDialog)
    }

    const successDialog = {
        title: '投票成功',
        children: <>
            謝謝您投出寶貴的一票。<br />
            {!useDiD && <a target="_blank" href={process.env.NEXT_PUBLIC_TW_DID_API}>申請台灣DiD</a>}
        </>,
        actions: [{
            text: '確定',
            onClick: () => voteDialog.close()
        }]
    }

    const errorDialog = {
        title: '投票失敗',
        children: '投票失敗，請稍後再試',
        actions: [{
            text: '確定',
            onClick: () => voteDialog.close()
        }]
    }

    return <>
        {voteDialog.props && <Dialog {...voteDialog.props} className={styles.voteDialog} />}
        <Card>
            {/* {wallet && <div className={styles.wallet}>{wallet?.address}</div>} */}
            <div className={styles.CandidateCard + ' ' + (useDiD ? styles.useDiD : '')}>
                {elected && <div className={styles.elected}><img src={electedImage.src} alt='elected' /></div>}
                {
                    vote ? <Button onClick={() => voteDialog.open(confirmDialog)} text='投票給我' variant="primary" />
                        : <Button onClick={() => { }} text='投票給我' variant="primary" disabled={true} />
                }
                <hr />

                <div className={styles.index}>{index + 1}</div>
                <hr />

                <div className={styles.media}><img src={potrait} alt={name} /></div>
                <hr />

                <div className={styles.name}>{name}</div>
                <hr />

                <div className={styles.dao}><MultiLine text={dao} /></div>

                {voteCount && <div className={styles.vote}>{voteCount} 票</div>}
            </div>

        </Card>
    </>
}