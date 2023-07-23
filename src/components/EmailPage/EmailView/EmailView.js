import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { markAsReadAction } from '../../../redux/actions/emailActions';
import styles from './styles/EmailView.module.css';
import EmailOptions, { Delete, GoBack, MarkUnread, PlaceTrash } from '../EmailOptions/EmailOptions';
import { Avatar } from '@material-ui/core';

export default function EmailView({ inbox, sent, drafts, starred, trash, read, email, inboxReply, outboxReply, toggleIsCompose }) {
  const dispatch = useDispatch();
  const { category, id } = useParams();
  const { user } = useSelector((state) => state.userReducer);
  const [mailsArr] = useState([]);

  const [emailToDisplay] = useState(() => {
    switch (category) {
      case 'inbox':
        if (inboxReply.length > 0) {
          inboxReply.forEach((inbox) => {
            if (inbox.inboxId === id) {
              inbox.replyId.forEach((reply) => {
                email.forEach((email) => {
                  if (reply === email._id) {
                    mailsArr.push(email);
                  }
                })
              })
            }
          });
        }
        mailsArr.push(inbox.find((item) => item._id === id));
        mailsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return mailsArr;
      case 'sent':
        if (outboxReply.length > 0) {
          outboxReply.forEach((outbox) => {
            if (outbox.outboxId === id) {
              outbox.replyId.forEach((reply) => {
                email.forEach((email) => {
                  if (reply === email._id) {
                    mailsArr.push(email);
                  }
                })
              })
            }
          });
        }
        mailsArr.push(sent.find((item) => item._id === id));
        mailsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return mailsArr;
      case 'drafts':
        return drafts.find((item) => item._id === id);
      case 'starred':

        if (inbox.find((item) => item._id === id) !== undefined) {
          if (inboxReply.length > 0) {
            inboxReply.forEach((inbox) => {
              if (inbox.inboxId === id) {
                inbox.replyId.forEach((reply) => {
                  email.forEach((email) => {
                    if (reply === email._id) {
                      mailsArr.push(email);
                    }
                  })
                })
              }
            });
          }
        } else if (sent.find((item) => item._id === id) !== undefined) {
          if (outboxReply.length > 0) {
            outboxReply.forEach((outbox) => {
              if (outbox.outboxId === id) {
                outbox.replyId.forEach((reply) => {
                  email.forEach((email) => {
                    if (reply === email._id) {
                      mailsArr.push(email);
                    }
                  })
                })
              }
            });
          }
        }

        mailsArr.push(starred.find((item) => item._id === id));
        mailsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return mailsArr;
      case 'trash':
        return trash.find((item) => item._id === id);
      default:
        break;
    }
  });

  var Mails = [];
  for (var i = 0; i < emailToDisplay.length; i++) {
    let replyId = emailToDisplay[i]._id;
    Mails.push(
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3>{i === 0 && emailToDisplay[i].subject}</h3>
          {i !== 0 && <span>Mail Subject : "{emailToDisplay[i].subject}"</span>}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Avatar className={styles.avatar} />
            <div className={styles.avatar}>{emailToDisplay[i].from}
              <br />
              to {(user.email !== emailToDisplay[i].to) ? emailToDisplay[i].to : 'me'}</div>
            <div className={styles.avatar}>{new Date(emailToDisplay[i].createdAt).toLocaleString("en-IN", { timezone: "Asia/Kolkata" })}</div>
            <button style={{ width: '60px', marginLeft: '30px', color: 'white', backgroundColor: 'black', borderRadius: '7px' }} onClick={() => toggleIsCompose(id, replyId, mailsArr)}>Reply</button>
          </div>
          <hr></hr>
          <p>{emailToDisplay[i].message}</p>
        </div>
      </div>
    );
  }

  // this side effect marks the email as read (if it wasn't already marked as read)
  useEffect(() => {
    if ((!(read.find((readId) => readId === id) !== undefined))? true: false) {
      dispatch(markAsReadAction(id));
    }
  }, [dispatch, read, id]);

  return (
    <Fragment>
      <EmailOptions>
        <GoBack />
        <PlaceTrash id={id} isInTrash={category === 'trash'} />
        {category === 'trash' ? <Delete id={id}/> : <MarkUnread id={id} />}
      </EmailOptions>
      {Mails}
    </Fragment>
  );
}
