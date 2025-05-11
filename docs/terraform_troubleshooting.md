# Terraform Troubleshooting Guide

## SSH Connection Issues

If you encounter SSH connection errors during `terraform apply`, it may be due to Docker containers not being properly cleaned up on the remote host.

### Solution

Try running the following commands manually on the remote host to clean up any lingering Docker containers:

```bash
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
```

This will stop and remove all Docker containers, freeing up resources and potentially resolving SSH connection issues.

After running these commands, try running `terraform apply` again.
