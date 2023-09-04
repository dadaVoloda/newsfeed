import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { InputErrors, InputName, InputRefs, InputValues } from './types';
import { getErrors, getImage } from './helpers';
import {
  createPartnerArticle,
  deletePartnerArticle,
  getPartnerArticle,
  updatePartnerArticle,
  uploadFile,
} from '@app/api';

export const AdminArticleItem: FC = () => {
  const { id }: { id?: string } = useParams();
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSnackbar = () => {
    setSnackbarMessage(null);
  };

  const goToAdmin = () => navigate({ pathname: '/admin' });

  const inputRefs: InputRefs = {
    'company-name': useRef<HTMLInputElement>(),
    title: useRef<HTMLInputElement>(),
    description: useRef<HTMLTextAreaElement>(),
    text: useRef<HTMLTextAreaElement>(),
    image: useRef<HTMLInputElement>(),
  };
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });
  const [inputValues, setInputValues] = useState<InputValues>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.currentTarget;
    const { name, value } = input;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const deleteArticle = async (id: string) => {
    if (!id) return;

    deletePartnerArticle(id)
      .then(() => {
        setSnackbarMessage('✅ Статья удалена');
        setTimeout(goToAdmin, 1000);
      })
      .catch((error) => {
        setSnackbarMessage(`❌ ${error.message}`);
      });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Собрать данные
    const data = new FormData();

    Object.entries(inputValues).forEach(([name, value]) => {
      data.append(name, value);
    });

    // 2. Проверить данные
    const errors = await getErrors(Array.from(data.entries()) as [InputName, FormDataEntryValue][]);
    const errorsEntries = Object.entries(errors);

    // 3.1 Подставить ошибки
    setInputErrors(errors);

    // 3.2 Сфокусироваться на первом ошибочном инпуте
    const errorInput = errorsEntries.find(([, value]) => value.length > 0);

    if (errorInput) {
      const name = errorInput[0] as InputName;
      const inputRef = inputRefs[name];

      if (inputRef.current) {
        inputRef.current.focus();
      }

      return;
    }

    // 4. Если все ок, отправить данные
    if (id) {
      updatePartnerArticle(id, inputValues)
        .then(() => {
          setSnackbarMessage('✅ Статья обновлена');
          // goToAdmin();
        })
        .catch((error) => {
          setSnackbarMessage(`❌ ${error.message}`);
        });
    } else {
      createPartnerArticle(inputValues)
        .then(() => {
          setSnackbarMessage('✅ Статья создана');
          // goToAdmin();
        })
        .catch((error) => {
          setSnackbarMessage(`❌ ${error.message}`);
        });
    }
  };

  const showFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files === null || !files.length) {
      return;
    }

    const file = files[0];

    if (file.size === 0 || !file.type.startsWith('image/')) {
      return;
    }

    const image = await getImage(file);

    if (image.width < 200 || image.height < 200) {
      setInputErrors({
        ...inputErrors,
        image: 'Изображение должно быть минимум 200*200',
      });

      return;
    }

    try {
      const url = await uploadFile(file);

      setInputValues({
        ...inputValues,
        image: url,
      });
    } catch (error: any) {
      setSnackbarMessage(`❌ ${error.message}`);
    }
  };

  useEffect(() => {
    if (!id) return;

    (async () => {
      const data = await getPartnerArticle(id);

      setInputValues({
        'company-name': data['company-name'],
        title: data.title,
        description: data.description,
        text: data.text,
        image: data.image,
      });
    })();
  }, [id]);

  return (
    <Box component="form" noValidate onSubmit={onSubmit}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            {id ? `Редактирование статьи «${inputValues.title}»` : 'Новая статья'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="success" sx={{ mr: 1 }}>
              Сохранить
            </Button>

            {id && (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => deleteArticle(id)}>Удалить статью</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Компания"
                name="company-name"
                variant="outlined"
                value={inputValues['company-name']}
                onChange={onChangeInput}
                ref={inputRefs['company-name']}
                error={!!inputErrors['company-name']}
                helperText={inputErrors['company-name']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название статьи"
                name="title"
                variant="outlined"
                value={inputValues.title}
                onChange={onChangeInput}
                ref={inputRefs.title}
                error={!!inputErrors.title}
                helperText={inputErrors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                label="Подводка"
                name="description"
                variant="outlined"
                value={inputValues.description}
                onChange={onChangeInput}
                ref={inputRefs.description}
                error={!!inputErrors.description}
                helperText={inputErrors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={12}
                label="Текст"
                name="text"
                variant="outlined"
                value={inputValues.text}
                onChange={onChangeInput}
                ref={inputRefs.text}
                error={!!inputErrors.text}
                helperText={inputErrors.text}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardActionArea>
              {Boolean(inputValues.image) && (
                <CardMedia
                  component="img"
                  height="140"
                  image={inputValues.image}
                  alt="Добавленное изображение"
                />
              )}

              <CardContent>
                <TextField
                  type="file"
                  name="image"
                  fullWidth
                  variant="outlined"
                  onChange={showFile}
                  ref={inputRefs.image}
                  error={!!inputErrors.image}
                  helperText={inputErrors.image}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={typeof snackbarMessage === 'string'}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};