import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Rating } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarIcon from "@mui/icons-material/Star";

function AnimeDetailPopup({ anime, onClose }) {
  const serverName = 'http://localhost:8080/anime/';

  const [data, setData] = useState({
    id: anime.id,
    rating: 0,
    comment: '',
    user: '', // Added user field
  });

  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('LoggedInUser') || '');
  const [userComments, setUserComments] = useState(JSON.parse(localStorage.getItem('UserComments')) || []);

  useEffect(() => {
    if (loggedInUser) {
      const loggedInUserName = JSON.parse(loggedInUser).name;
      setData((prevData) => ({ ...prevData, user: loggedInUserName }));
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(serverName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        // Clear comment and rating fields
        setData((prevData) => ({
          ...prevData,
          comment: '',
          rating: 0,

        }));

        // Create a new user comment object
        const newUserComment = {
          id: anime.id,
          user: data.user,
          rating: data.rating,
          comment: data.comment,
        };

        // Update userComments state and localStorage
        setUserComments([...userComments, newUserComment]);
        localStorage.setItem('UserComments', JSON.stringify([...userComments, newUserComment]));
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      ก่อนหน้า
      <div className="grid grid-cols-5 gap-4 bg-white rounded-lg p-8 max-w-3xl w-full">
        <div className="col-span-2">

          <img src={anime.img2} alt={anime.name} className="w-full object-cover" />
        </div>
        <div className="col-span-3">
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-red-700">
              <FaTimes size={18} onClick={onClose} />
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">{anime.name}</h2>
          <p className="text-xl">เรื่องย่อ</p>
          <p className="text-l text-gray-600 mb-4 mt-2">{anime.descript}</p>
          <div className="text-l text-gray-500">ประเภท: {anime.type}</div>
          <div className="text-l text-gray-500">หมวดหมู่: {anime.category}</div>
          <div className="text-l text-gray-500">จำนวนตอน: {anime.episode}</div>
        </div>

        <div className="col-span-5 ">
          {/* Rating and Comment Form */}
          {loggedInUser ? (
            <>
              <p className='text-xl font-semibold'>Rating :</p>
              <Rating
                className="mb-5"
                name="rating"
                value={data.rating}
                precision={0.5}
                size="large"
                onChange={handleChange}
              />
              <TextField
                label="แสดงความคิดเห็น"
                multiline
                rows={2}
                name="comment"
                value={data.comment}
                onChange={handleChange}
                style={{ width: '100%' }}
              />

              <div className="mt-3 flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  ส่งความคิดเห็น
                </Button>
              </div>
            </>
          ) : (
            <p >กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น<a href="../LoginWithLocalStorageUser" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">กดเพื่อเข้าสู่ระบบ</a>
              {/* <button className='text-blue-600 text-l'> กดเพื่อเข้าสู่ระบบ</button> */}
            </p>
          )}
        </div>

        <div className="col-span-5 ">
          <div className="border rounded-lg p-4 bg-gray-100 h-36 overflow-y-auto">
            <p className='text-l font-semibold'>Rating :</p>
            <Rating
              name={"rating" + anime.id}
              defaultValue={anime.rating}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />

            
            <div className="col-span-5">
              <ul className="list-disc pl-6 space-y-2">
                {Object.values(anime.comment).map((comment, index) => (
                  <li key={index}>
                    <p className="text-l">
                      {comment.user_text}: {comment.comment_text}
                      <span className="text-gray-600"> - โหวต {comment.vote} ดาว</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetailPopup;
