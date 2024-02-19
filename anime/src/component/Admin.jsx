import React, { useEffect, useState, useRef } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';

function Admin() {
    const handleClick = () => {
        localStorage.removeItem("emailData");
        localStorage.removeItem("passwordData");
        window.location.reload();
    }
    

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        descript: '',
        img: '',
        img2: '',
        type: '',
        category: '',
        episode: '',
        rating: ''
    });
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from the API
        fetch('http://localhost:8080/anime/')
            // fetch('http://student.crru.ac.th/641413019/anime/')
            .then((response) => response.json())
            .then((data) => {
                const sortedData = data.slice().sort((a, b) => a.id - b.id);
                setData(sortedData);
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    };
    
    // const sortedData = data.slice().sort((a, b) => a.id - b.id);: ในบรรทัดนี้คุณทำการสร้างอาร์เรย์ที่มีค่าเป็นข้อมูลทั้งหมดใน data โดยใช้ data.slice() เพื่อคัดลอกข้อมูลทั้งหมด จากนั้นคุณใช้ .sort() เพื่อเรียงลำดับข้อมูลด้วยเงื่อนไขในการเปรียบเทียบ id ของแต่ละ anime

    // setData(sortedData);: นี่คือการอัพเดตสถานะของ data ในส่วนของคอมโพเนนต์ เพื่อให้ข้อมูลที่ถูกเรียงลำดับด้วย id ถูกแสดงผลในแอปพลิเคชัน
    
    // โดยทั้งสองขั้นตอนนี้ร่วมกันจะสร้างผลลัพธ์ที่ sortedData จะเป็นอาร์เรย์ของข้อมูล anime ที่เรียงลำดับตาม id และเมื่อคุณใช้ setData(sortedData) จะทำการอัพเดตสถานะของ data ในคอมโพเนนต์เพื่อแสดงผลข้อมูลที่ถูกเรียงลำดับในการแสดงผลบนหน้าเว็บแอปพลิเคชันของคุณ

    const handleModalOpen = () => {
        setSelectedPlace(null);
        setFormData({
            id: '',
            name: '',
            descript: '',
            img: '',
            img2: '',
            type: '',
            category: '',
            episode: '',
            rating: ''
        });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedPlace) {
            fetch(`http://localhost:8080/anime/${selectedPlace.id}`, {
                // fetch(`http://student.crru.ac.th/641413019/anime/${selectedPlace.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(updatedPlace => {
                    setData(data.map(place => (place.id === updatedPlace.id ? updatedPlace : place)));
                    setFormData({
                        id: '',
                        name: '',
                        descript: '',
                        img: '',
                        img2: '',
                        type: '',
                        category: '',
                        episode: '',
                        rating: ''
                    });
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error updating data to the API:', error);
                });
            window.alert('แก้ไขสำเร็จแล้ว')
        } else {
            fetch('http://localhost:8080/anime/', {
                // fetch('http://student.crru.ac.th/641413019/anime/', {
                method: 'CREATE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(newPlace => {
                    setData([...data, newPlace]);
                    setFormData({
                        id: '',
                        name: '',
                        descript: '',
                        img: '',
                        img2: '',
                        type: '',
                        category: '',
                        episode: '',
                        rating: ''
                    });
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error sending data to the API:', error);
                });
            window.alert('เพิ่มข้อมูลสำเร็จแล้ว')
        }
        window.location.reload();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (id) => {
        const placeToEdit = data.find(place => place.id === id);
        if (placeToEdit) {
            setSelectedPlace(placeToEdit);
            setFormData({
                id: placeToEdit.id,
                name: placeToEdit.name,
                descript: placeToEdit.descript,
                img: placeToEdit.img,
                img2: placeToEdit.img2,
                type: placeToEdit.type,
                category: placeToEdit.category,
                episode: placeToEdit.episode,
                rating: placeToEdit.rating
            });
            setShowModal(true);
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('ยืนยันการลบข้อมูล');

        if (confirmDelete) {
            fetch(`http://localhost:8080/anime/`, {
                // fetch(`http://student.crru.ac.th/641413019/anime/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
                .then(response => response.json())
                .then(() => {
                    setData(data.filter(place => place.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting data from the API:', error);
                }); window.alert('ลบสำเร็จแล้ว'), window.location.reload();
        } else {
            console.log('Deletion canceled.');

        }
        // window.alert('ลบสำเร็จแล้ว')
        // window.location.reload();
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (

        <div className='min-h-screen flex items-top justify-center '>
        <div className='mt-16 bg-white shadow-lg rounded-lg px-5 py-2 '>

            <div className="flex justify-end">
                <button className='bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4' onClick={handleClick}>Logout</button>
            </div>

            <div className="pagination flex justify-center items-center">
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded-lg mx-1`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleModalOpen}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4"
                >
                    เพิ่มข้อมูล
                </button>
            </div>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-4">
                            {selectedPlace ? 'แก้ไขข้อมูลอาหาร' : 'เพิ่มข้อมูลอาหาร'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            {/* <TextField label="รหัสอนิเมะ" name="id" value={formData.id} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} /> */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-l font-medium text-gray-700">
                                    ชื่ออนิเมะ
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-3/3 shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="descript" className="block text-l font-medium text-gray-700">
                                    รายละเอียดอนิเมะ
                                </label>
                                <textarea
                                    id="descript"
                                    name="descript"
                                    value={formData.descript}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="img" className="block text-l font-medium text-gray-700">
                                    รูปBanner
                                </label>
                                <input
                                    type="text"
                                    name="img"
                                    id="img"
                                    value={formData.img}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-3/3 shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div> 
                            <div className="mb-4">
                                <label htmlFor="img2" className="block text-l font-medium text-gray-700">
                                    รูปอนิเมะ
                                </label>
                                <input
                                    type="text"
                                    name="img2"
                                    id="img2"
                                    value={formData.img2}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-3/3 shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label htmlFor="img" className="block text-l font-medium text-gray-700">
                                    รูปBanner
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="img"
                                    id="img"
                                    onChange={(event) => setImgFile(event.target.files[0])}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-3/3 shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="img" className="block text-l font-medium text-gray-700">
                                    รูปอนิเมะ
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="img2"
                                    id="img2"
                                    onChange={(event) => setImg2File(event.target.files[0])}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-3/3 shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div> */}
                            <div className="mb-4">
                                <label htmlFor="type" className="block text-l font-medium text-gray-700">
                                    ประเภทอนิเมะ
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    id="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-l font-medium text-gray-700">
                                    หมวดหมู่
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="episode" className="block text-l font-medium text-gray-700">
                                    ตอนทั้งหมด
                                </label>
                                <input
                                    type="text"
                                    name="episode"
                                    id="episode"
                                    value={formData.episode}
                                    onChange={handleInputChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md border border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="text-gray-500 hover:text-gray-700 px-4 py-2 mr-2"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
                                >
                                    {selectedPlace ? 'แก้ไข' : 'บันทึก'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto ">
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">รหัสอนิเมะ</th>
                            <th className="px-4 py-2">ชื่ออนิเมะ</th>
                            <th className="px-4 py-2">รายละเอียดอนิเมะ</th>
                            <th className="px-4 py-2">รูปBanner</th>
                            <th className="px-4 py-2">รูป</th>
                            <th className="px-4 py-2">ประเภทอนิเมะ</th>
                            <th className="px-4 py-2">หมวดหมู่</th>
                            <th className="px-4 py-2">จำนวนตอน</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(place => (
                            <tr key={place.id}>
                                <td className="border px-4 py-2">{place.id}</td>
                                <td className="border px-4 py-2">{place.name}</td>
                                <td className="border px-4 py-2">{place.descript}</td>
                                <td className="border px-4 py-2">
                                    <img src={place.img} alt={place.name} className="max-w-sm max-h-20" />
                                </td>
                                <td className="border px-4 py-2">
                                    <img src={place.img2} alt={place.name} className="max-w-md max-h-24" />
                                </td>
                                <td className="border px-4 py-2">{place.type}</td>
                                <td className="border px-4 py-2">{place.category}</td>
                                <td className="border px-4 py-2">{place.episode}</td>
                                <td className="border px-4 py-5">
                                    <div className="flex justify-between">
                                        <button
                                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                            onClick={() => handleEdit(place.id)}
                                        >
                                            <BsPencil />
                                        </button>
                                        <button
                                            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                            onClick={() => handleDelete(place.id)}
                                        >
                                            <BsTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            </div>
        </div>

    );
}

export default Admin;
