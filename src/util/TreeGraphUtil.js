/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import * as d3 from 'd3';
import _ from 'lodash';

/** Tree Graph Util Method */
const treeGraphUtil = treeData => {
  const link = [];
  const finalArr = [];

  /** Parent Node json */
  function parentNode(arr) {
    const parentId = arr.uid;
    linkNodeGenerator(arr.children, parentId);
  }

  /** Link Generator json */
  function linkNodeGenerator(arr, parentId) {
    if (arr && arr.length > 0) {
      arr.map(a => {
        link.push({ source: parentId, target: a.uid });
        linkNodeGenerator(a.children, a.uid);
      });
    }
  }

  function flatDeep(arr) {
    const parentObject = _.omit(arr, 'children');
    finalArr.push(_.assign(parentObject, { isRoot: true }));
    flat(arr.children);
  }

  function flat(arr) {
    if (arr && arr.length > 0) {
      arr.map(a => {
        finalArr.push(_.omit(a, 'children'));
        flat(a.children);
      });
    }
  }

  parentNode(treeData);

  flatDeep(treeData);

  function getNodeColor(node) {
    let nodecolor;
    if (node.isRoot) {
      nodecolor = '#FF9900';
    } else if (node.isPurchase) {
      nodecolor = 'blue';
    } else if (!node.isPurchase) {
      nodecolor = 'yellow';
    }
    return nodecolor;
  }

  const width = document.getElementById('treeDraw').offsetWidth;
  const height = 400;
  const radius = 25;

  const svg = d3
    .select('.treeDraw')
    .append('svg')
    .style('background', 'black');

  svg.attr('width', width).attr('height', height);

  /** simulation setup with all forces */
  const linkForce = d3
    .forceLink()
    .id(links => {
      return links.uid;
    })
    .distance(node => {
      return 100;
    })
    .strength(link => {
      return 2;
    });

  const simulation = d3
    .forceSimulation()
    .force('link', linkForce)
    .force('charge', d3.forceManyBody().strength(-550))
    .force('center', d3.forceCenter(width / 2, height / 2));

  const linkElements = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(link)
    .enter()
    .append('line')
    .attr('stroke-width', 2)
    .attr('stroke', 'rgba(187,187,187,0.4)');

  const nodeElements = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(finalArr)
    .enter()
    .append('circle')
    .attr('r', node => {
      if (node.isRoot) {
        return 40;
      }
      if (!node.isPurchase) {
        return 20;
      }
      if (node.isPurchase) {
        return 15;
      }
    })
    .attr('fill', getNodeColor);

  /** Append images */
  const url = '/img/recommendations/iconpurchase.png';
  const images = nodeElements
    .append('image')
    .attr('xlink:href', d => {
      if (d.isPurchase) {
        return url;
      }
    })
    .attr('x', d => {
      return -25;
    })
    .attr('y', d => {
      return -25;
    })
    .attr('height', 50)
    .attr('width', 50);

  const textElements = svg
    .append('g')
    .attr('class', 'texts')
    .selectAll('text')
    .data(finalArr)
    .enter()
    .append('text')
    .attr('fill', 'black')
    .style('font-weight', 600)
    .text(node => {
      if (node.isRoot) {
        return ``;
      }
      if (node.isPurchase) {
        return ``;
      }
    })
    .attr('font-size', 15)
    .attr('text-anchor', 'middle')
    .attr('dy', 4);

  simulation.nodes(finalArr).on('tick', () => {
    // node boundary
    nodeElements
      .attr('cx', node => {
        // eslint-disable-next-line no-param-reassign
        node.x = Math.max(radius, Math.min(width - radius, node.x));
        return node.x;
      })
      .attr('cy', node => {
        // eslint-disable-next-line no-param-reassign
        node.y = Math.max(radius, Math.min(height - radius, node.y));
        return node.y;
      });
    textElements
      .attr('x', node => {
        return node.x;
      })
      .attr('y', node => {
        return node.y;
      });
    linkElements
      .attr('x1', links => {
        return links.source.x;
      })
      .attr('y1', links => {
        return links.source.y;
      })
      .attr('x2', links => {
        return links.target.x;
      })
      .attr('y2', links => {
        return links.target.y;
      });
  });

  simulation.force('link').links(link);
};

export default treeGraphUtil;
