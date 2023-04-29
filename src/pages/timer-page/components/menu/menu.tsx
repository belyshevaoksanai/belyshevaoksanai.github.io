import * as React from 'react';
import { IconButton, IconButtonProps, ListItemIcon, ListItemText, Menu as MuiMenu, styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { AddIcon, EditIcon, MenuIcon, ReduceIcon } from '../../../../icons';
import { ActionEnum } from '../../../../constants/actions';
import { DeleteIcon } from '../../../../icons/delete';

const MenuButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    '&.MuiIconButton-root': {
        width: '24px',
        height: '6px',
    },
}));

interface IMenuProps {
    onClick: (action: ActionEnum) => void;
    count: number;
}

export const Menu = ({ onClick, count }: IMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onOptionClick = (action: ActionEnum) => () => {
        handleClose();
        onClick(action);
    };

    return (
        <div>
            <MenuButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </MenuButton>
            <MuiMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={onOptionClick(ActionEnum.ADD_POMODORO)}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText>Увеличить</ListItemText>
                </MenuItem>
                <MenuItem onClick={onOptionClick(ActionEnum.DELETE_POMODORO)} disabled={count === 1}>
                    <ListItemIcon>
                        <ReduceIcon />
                    </ListItemIcon>
                    <ListItemText>Уменьшить</ListItemText>
                </MenuItem>
                <MenuItem onClick={onOptionClick(ActionEnum.EDIT_TASK)}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText>Редактировать</ListItemText>
                </MenuItem>
                <MenuItem onClick={onOptionClick(ActionEnum.DELETE_TASK)}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>Удалить</ListItemText>
                </MenuItem>
            </MuiMenu>
        </div>
    );
}