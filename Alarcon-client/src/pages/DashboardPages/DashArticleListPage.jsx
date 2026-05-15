import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from "../../services/ArticleService";
import { getStoredUser, hasAllowedRole } from "../../utils/auth";

const blankForm = {
  name: "",
  title: "",
  image: "",
  content: "",
  isPublished: true,
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const currentUser = getStoredUser();
  const canEdit = hasAllowedRole(["admin", "editor"], currentUser);

  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });
  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const response = await fetchArticles();
        setArticles(Array.isArray(response.data) ? response.data : []);
        setApiError("");
      } catch (err) {
        setApiError(err.response?.data?.message || err.message || "Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleFieldChange = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleOpenAddDialog = () => {
    setEditRowId(null);
    setForm(blankForm);
    setError("");
    setOpen(true);
  };

  const handleOpenEditDialog = (row) => {
    setEditRowId(row.id);
    setForm({
      name: row.name ?? "",
      title: row.title ?? "",
      image: row.image ?? "",
      content: Array.isArray(row.content) ? row.content.join("\n\n") : "",
      isPublished: Boolean(row.isPublished),
    });
    setError("");
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditRowId(null);
    setForm(blankForm);
    setError("");
    setOpen(false);
  };

  const handleDelete = async (articleId) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteArticle(articleId);
      setArticles((prev) => prev.filter((article) => article.id !== articleId));
      setApiError("");
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || "Failed to delete article.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Article title is required.");
      return;
    }

    if (!form.content.trim()) {
      setError("Please provide article content.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      title: form.title.trim(),
      image: form.image.trim(),
      content: form.content,
      isPublished: form.isPublished,
    };

    try {
      setLoading(true);
      if (editRowId) {
        const response = await updateArticle(editRowId, payload);
        setArticles((prev) =>
          prev.map((article) => (article.id === editRowId ? response.data : article))
        );
      } else {
        const response = await createArticle(payload);
        setArticles((prev) => [response.data, ...prev]);
      }

      setApiError("");
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save article.");
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    const value = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesSearch = !value
        ? true
        : [article.title, article.name, ...(article.content || [])].join(" ").toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "published"
          ? article.isPublished
          : !article.isPublished;

      return matchesSearch && matchesStatus;
    });
  }, [articles, query, statusFilter]);

  const columns = [
    { field: "title", headerName: "Title", minWidth: 220, flex: 1 },
    { field: "name", headerName: "Slug", minWidth: 180, flex: 1 },
    {
      field: "content",
      headerName: "Preview",
      minWidth: 260,
      flex: 1.2,
      valueGetter: (_, row) => row.content?.[0] || "",
    },
    {
      field: "isPublished",
      headerName: "Status",
      minWidth: 120,
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value ? "Published" : "Draft"}
          color={params.value ? "success" : "default"}
          variant={params.value ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => handleOpenEditDialog(params.row)} disabled={!canEdit}>
            Edit
          </Button>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            disabled={loading || !canEdit}
            title="Delete article"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const publishedCount = articles.filter((article) => article.isPublished).length;

  return (
    <Container maxWidth="xl" disableGutters={false} sx={{ px: { xs: 0.5, sm: 1 } }}>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 3,
            color: "white",
            background:
              "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(34,197,94,0.85) 100%)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-start" }}
            spacing={2}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 1 }}>
                PUBLISHING
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                Dashboard Articles
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.92, maxWidth: 720 }}>
                Manage the article catalog used by both the dashboard and the public article pages.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                <Chip label={`Total: ${articles.length}`} color="primary" />
                <Chip
                  label={`Published: ${publishedCount}`}
                  variant="outlined"
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.65)" }}
                />
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={handleOpenAddDialog}
              disabled={loading || !canEdit}
              sx={{
                minWidth: { xs: "100%", sm: 180 },
                alignSelf: { xs: "stretch", md: "flex-start" },
                ml: { md: "auto" },
                px: 3,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Add Article
            </Button>
          </Stack>
        </Paper>

        {apiError ? <Alert severity="error">{apiError}</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}

        <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <TextField
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  size="small"
                  fullWidth
                  label="Search articles"
                  placeholder="Find by title, slug, or content..."
                />
                <TextField
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  size="small"
                  label="Status"
                  select
                  sx={{ minWidth: 160 }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </TextField>
              </Stack>
              <Box sx={{ height: 560, width: "100%" }}>
                <DataGrid
                  rows={filteredArticles}
                  columns={columns}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                      outline: "none !important",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "rgba(34, 197, 94, 0.10)",
                    },
                  }}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Dialog
          open={open}
          onClose={handleCloseDialog}
          fullScreen={fullScreen}
          maxWidth="md"
          fullWidth
          slotProps={{
            paper: {
              sx: { borderRadius: 3 },
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editRowId ? "Update Article" : "Add Article"}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 0.5 }}>
              <TextField label="Title" value={form.title} onChange={handleFieldChange("title")} fullWidth />
              <TextField
                label="Slug"
                value={form.name}
                onChange={handleFieldChange("name")}
                helperText="Optional. Leave blank to generate from the title."
                fullWidth
              />
              <TextField
                label="Image"
                value={form.image}
                onChange={handleFieldChange("image")}
                helperText="Use a known slug image key or a direct image URL."
                fullWidth
              />
              <TextField
                label="Content"
                value={form.content}
                onChange={handleFieldChange("content")}
                multiline
                minRows={8}
                helperText="Separate paragraphs with a blank line."
                fullWidth
              />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Switch checked={form.isPublished} onChange={handleFieldChange("isPublished")} />
                <Typography>{form.isPublished ? "Published" : "Draft"}</Typography>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog} disabled={loading}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={loading || !canEdit}>
              {loading ? "Saving..." : editRowId ? "Update Article" : "Save Article"}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
};

export default DashArticleListPage;
