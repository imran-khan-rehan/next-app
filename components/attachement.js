import React, { useState } from 'react';
import Image from 'next/image';
import add from '../public/icons/add.svg'
import fileImage from '../public/icons/file.svg'
import cross from '../public/icons/cross.svg'

const FileAttachment = () => {
    const [files, setFiles] = useState([]);
    const fileInputRef = React.createRef();

    // const handleFileInputChange = (e) => {
    //     const selectedFiles = e.target.files;
    //     const newFiles = [];

    //     for (let i = 0; i < selectedFiles.length; i++) {
    //         newFiles.push({
    //             name: selectedFiles[i].name,
    //             size: selectedFiles[i].size,
    //         });
    //     }

    //     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    // };

    // const handleRemoveFile = (index) => {
    //     const updatedFiles = [...files];
    //     updatedFiles.splice(index, 1);
    //     setFiles(updatedFiles);
    // };
    const handleFileInputChange = (e) => {
        const selectedFiles = e.target.files;
        const newFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileObject = {
                name: file.name,
                size: file.size,
                path: URL.createObjectURL(file), // Store the file path
            };
            newFiles.push(fileObject);
        }

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };


    function setsize(filesize) {
        let m = "";
        if (((filesize / (1024 * 1024)).toFixed(2)) > 0) {
            console.log(((filesize / (1024 * 1024)).toFixed(2)))
            m = ((filesize / (1024 * 1024)).toFixed(2));
            m += 'MB';

        }
        else if (((filesize / (1024)).toFixed(2)) > 0) {
            m = ((filesize / (1024)).toFixed(2));
            m += 'KB';

        }
        else {
            m = ((filesize).toFixed(2));
            m += 'BYTES';
        }
        return m;
    }

    const handleFileClick = (file) => {
        window.open(`path/to/your/api/endpoint/${file.name}`, '_blank');
    };
    return (
        <div >
            <h2 className="text-lg font-semibold max-md:text-base">Attachments</h2>
            <div className="flex flex-row flex-wrap gap-3 ">
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                />

                {files.map((file, index) => (
                    <div key={index} className="relative flex flex-row  bg-white rounded  pr-4 gap-2  flex-wrap cursor-pointer"  onClick={() => window.open(file.path, '_blank')}>
                        <div className=' flex justify-center w-6'>
                            <Image src={fileImage} width={23} height={23} alt='file' />
                        </div>
                        <div className="flex flex-col  max-w-[83%] overflow-wrap-break-word" style={{ overflowWrap: 'break-word' }}>

                            <p className='font-normal text-sm pr-2'>  {file.name} </p>
                            <p className='font-normal text-[10px]'>{setsize(file.size)}
                            </p>
                        </div>
                        <span
                            className="flex cursor-pointer justify-start w-2 absolute right-2 top-2"
                            onClick={() => handleRemoveFile(index)}>
                            <Image src={cross} width={7} height={7} alt='X' />

                        </span>
                    </div>
                ))}
                <span
                    className="bg-white cursor-pointer text-white p-2 h-fit rounded-xl"
                    onClick={() => fileInputRef.current.click()}
                >
                    <Image src={add} width={28} height={28} alt='add' />
                </span>
            </div>
        </div>
    );
};

export default FileAttachment;

