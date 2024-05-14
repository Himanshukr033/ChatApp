import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#424242",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#555555",
    color: "white",
  },
  gap:5,
  width: 290,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2),
  marginBottom: theme.spacing(2),
  borderRadius: 20,
}));


const LeftDrawerContent = ({ user, handleFunction }) => {
  return (
    <StyledBox onClick={handleFunction}>
      <Avatar
        mr={2}
        size="sm"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Typography variant="body1">{user.name}</Typography>
        <Typography sx={{fontSize:"11px"}}>
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default LeftDrawerContent;
