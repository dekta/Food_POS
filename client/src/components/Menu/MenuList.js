import React, { useEffect, useState } from 'react';
import {
  fetchMenuItems,
  deleteMenuItem,
  updateMenuItem,
} from '../../services/apiService';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteOutline,
  EditOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { handleGetUser, handleTruncate } from '../../utils/helper';

const MenuList = ({ onEdit, refetch }) => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [clickedItem, setClickedItem] = useState({ name: '', id: '' });
  const user = handleGetUser();
  const isEdit = user?.isAdmin || user?.accessType.includes('update');
  const isDelete = user?.isAdmin || user?.accessType.includes('delete');
  const isCustomer = user?.role === 'customer';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchMenuItems();
        setMenuItems(data);
      } catch (err) {
        if (err?.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [refetch]);

  const handleDelete = async (id) => {
    await deleteMenuItem(id);
    setMenuItems(menuItems.filter((item) => item._id !== id));
  };

  const handleAddCart = () => {
    const localStorageData = JSON.parse(localStorage.getItem('POS_CART')) || [];
    let isFound = false;
    let prevRecord = localStorageData?.map((item) => {
      if (item?._id === clickedItem?._id) {
        isFound = true;
        return { ...item, quantity: item?.quantity + quantity };
      }
      return item;
    });

    if (!isFound) {
      prevRecord = [...prevRecord, { ...clickedItem, quantity }];
    }
    localStorage.setItem('POS_CART', JSON.stringify(prevRecord));
    setClickedItem({});
    setQuantity(0);
    setIsOpen(false);
    navigate('/');
  };

  const handleChange = async (event, itemId) => {
    const { checked } = event.target;
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, isAvailable: checked } : item,
      ),
    );
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '2rem' }}
      >
        {menuItems.map((item) => (
          <Card key={item._id} sx={{ maxWidth: "345px",minWidth:"345px" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={item?.url}
              title={item?.name}
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {item?.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  ${item?.price}
                </Typography>
              </Box>
              <Tooltip title={item?.description}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {handleTruncate(item?.description, 45)}
                </Typography>
              </Tooltip>
            </CardContent>
            <CardActions>
              {!isCustomer && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={item?.isAvailable}
                      onChange={(event) => handleChange(event, item._id)}
                      name="isAvailable"
                      id="isAvailable"
                    />
                  }
                  label="Available"
                />
              )}

              {!isCustomer && (
                <>
                  <IconButton
                    disabled={isEdit ? false : true}
                    onClick={() => onEdit(item)}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    disabled={isDelete ? false : true}
                    onClick={() => handleDelete(item?._id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </>
              )}
            
                <Button
                  disabled={item?.isAvailable ? false : true}
                  onClick={() => {
                    setIsOpen(true);
                    setClickedItem(item);
                  }}
                  size="small"
                >
                  Add To Cart
                </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle>Add the quantity</DialogTitle>
        <DialogContent>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '10px 0px',
            }}
          >
            <Button
              disabled={quantity === 0 ? true : false}
              onClick={() => setQuantity(quantity - 1)}

            >
              <ArrowDownwardOutlined />
            </Button>
            <Typography variant="h4">{quantity}</Typography>
            <Button onClick={() => setQuantity(quantity + 1)}>
              <ArrowUpwardOutlined />
            </Button>
          </Box>
          <Button
            sx={{ width: '100%' }}
            onClick={handleAddCart}
            variant="contained"
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuList;
