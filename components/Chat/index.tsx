import { IDM, IChat } from 'typings/db';
import React, { FC, VFC, memo, useMemo } from 'react';
import gravatar from 'gravatar';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Image from 'next/image';

interface Props {
  data: IDM | IChat;
}

// const BACK_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3095' : 'https://sleact.nodebird.com';
const Chat: FC<Props> = ({ data }) => {
  const router = useRouter();
  const { workspace } = router.query;
  const user = 'Sender' in data ? data.Sender : data.User;
  console.log(data);

  //   const result = useMemo(
  //     () =>
  //       // uploads\\서버주소
  //       data.content.startsWith('uploads\\') || data.content.startsWith('uploads/') ? (
  //         <img src={`${BACK_URL}/${data.content}`} style={{ maxHeight: 200 }} />
  //       ) : (
  //         regexifyString({
  //           input: data.content,
  //           pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
  //           decorator(match, index) {
  //             const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
  //             if (arr) {
  //               return (
  //                 <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
  //                   @{arr[1]}
  //                 </Link>
  //               );
  //             }
  //             return <br key={index} />;
  //           },
  //         })
  //       ),
  //     [workspace, data.content]
  //   );

  return (
    <div className=" flex items-center py-2 px-5">
      <div className="chat-img mr-2">
        <Image
          src={`https:${gravatar.url(user.email, { s: '36px', d: 'retro' })}`}
          width={36}
          height={36}
          alt={user.nickname}
        />
      </div>
      <div className="chat-text flex flex-1 flex-col flex-wrap">
        <div className="chat-user flex">
          <b className="mr-1">{user.nickname}</b>
          <span className=" text-sm">{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <div>{data.content}</div>
        {/* <p>{result}</p> */}
      </div>
    </div>
  );
};

export default memo(Chat);
