import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './PacksTable.module.css';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, { useState } from 'react';
import { formatDate } from './PacksTable';
import { PackType } from './packsApi';
import { DeletePackModal } from './Modals/DeletePackModal';
import { UpdatePackModal } from './Modals/UpdatePackModal';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const PackItem: React.FC<PackItemPropsType> = ({ pack, userId }) => {
    const [deletePackData, setDeletePackData] = useState<PackType | null>(null);
    const [updatePackData, setUpdatePackData] = useState<PackType | null>(null);
    const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false);
    const [isOpenUpdatePackModal, setIsOpenUpdatePackModal] = useState(false);

    const openModalDeletePack = () => {
        setIsOpenDeletePackModal(true);
        setDeletePackData(pack);
    };

    const openModalUpdatePack = () => {
        setIsOpenUpdatePackModal(true);
        setUpdatePackData(pack);
    };

    const navigate = useNavigate();

    return (
        <TableRow
            key={pack._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" sx={{ textAlign: 'right' }}>
                <NavLink className={styles.pack}
                         to={`/cards/${pack._id}/${pack.name}`}
                >{pack.name}</NavLink>
            </TableCell>
            <TableCell align="right">{pack.cardsCount}</TableCell>
            <TableCell align="right">{pack.user_name}</TableCell>
            <TableCell align="right">{formatDate(pack.updated)}</TableCell>
            <TableCell className={styles.buttonBlock} sx={{ textAlign: 'right' }}>

                <Button
                    onClick={openModalDeletePack}
                    disabled={userId !== pack.user_id}
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                {deletePackData && <DeletePackModal
                    packName={pack.name}
                    packId={deletePackData._id}
                    isOpenModal={isOpenDeletePackModal}
                    setIsOpenModal={setIsOpenDeletePackModal} />
                }

                <Button
                    onClick={openModalUpdatePack}
                    disabled={userId !== pack.user_id}
                    color="secondary" size="small"
                    startIcon={<BorderColorIcon />}>
                    Edit
                </Button>
                {updatePackData && <UpdatePackModal
                    packId={updatePackData._id}
                    packName={updatePackData.name}
                    isOpenModal={isOpenUpdatePackModal}
                    setIsOpenModal={setIsOpenUpdatePackModal} />}

                <Button
                    disabled={pack.cardsCount === 0}
                    onClick={() => {
                        navigate(`/learn/${pack._id}/${pack.name}`);
                    }} color="secondary" size="small"
                    startIcon={<MenuBookIcon />}>
                    Learn
                </Button>
            </TableCell>
        </TableRow>
    );
};

type PackItemPropsType = {
    pack: PackType
    userId: string
    deletePackHandler: (packId: string) => void
    changePackNameHandler: (packId: string, newPackName: string) => void
}